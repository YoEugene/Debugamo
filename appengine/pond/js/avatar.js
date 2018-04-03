/**
 * Blockly Games: Pond
 *
 * Copyright 2013 Google Inc.
 * https://github.com/google/blockly-games
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview A single avatar.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Pond.Avatar');

goog.require('goog.math');
goog.require('goog.math.Coordinate');
goog.require('goog.net.XhrIo');


/**
 * Class for a avatar.
 * @param {string} name Avatar's name.
 * @param {string|!Function} code Avatar's code, or generator.
 * @param {!goog.math.Coordinate} startLoc Start location.
 * @param {?number} startDamage Initial damage to avatar (0-100, default 0).
 * @param {!Pond.Battle} battle The battle featuring the avatar.
 * @constructor
 */
Pond.Avatar = function(name, code, startLoc, startDamage, battle) {
  this.name = name;
  this.code_ = code;
  this.startLoc_ = startLoc;
  this.startDamage_ = startDamage || 0;
  this.battle_ = battle;
  this.loc = new goog.math.Coordinate();
  this.reset();
  console.log(this + ' loaded.');
};

/**
 * Has this avatar fully loaded and started playing?
 */
Pond.Avatar.prototype.started = false;

/**
 * Has the avatar been killed?
 */
Pond.Avatar.prototype.dead = false;

/**
 * Damage of this avatar (0 = perfect, 100 = dead).
 */
Pond.Avatar.prototype.damage = 0;

/**
 * Heading the avatar is moving in (0 - 360).
 */
Pond.Avatar.prototype.degree = 0;

/**
 * Direction the avatar's head is facing (0 - 360).
 */
Pond.Avatar.prototype.facing = 0;

/**
 * Speed the avatar is actually moving (0 - 100).
 */
Pond.Avatar.prototype.speed = 0;

/**
 * Speed the avatar is aiming to move at (0 - 100).
 */
Pond.Avatar.prototype.desiredSpeed = 0;

/**
 * X/Y location of the avatar (0 - 100).
 * @type goog.math.Coordinate
 */
Pond.Avatar.prototype.loc = null;

/**
 * Date of last missile.
 */
Pond.Avatar.prototype.lastMissile = 0;

/**
 * A text representation of this avatar for debugging purposes.
 * @return {string} String representation.
 */
Pond.Avatar.prototype.toString = function() {
  return '[' + this.name + ']';
};

/**
 * Reset this avatar to a starting state.
 */
Pond.Avatar.prototype.reset = function() {
  delete this.started;
  delete this.dead;
  delete this.speed;
  delete this.desiredSpeed;
  delete this.lastMissile;

  this.damage = this.startDamage_;
  this.loc.x = this.startLoc_.x;
  this.loc.y = this.startLoc_.y;
  // Face the centre.
  this.degree = goog.math.angle(this.loc.x, this.loc.y, 50, 50);
  this.facing = this.degree;
  var code = this.code_;
  if (goog.isFunction(code)) {
    code = code();
  } else if (!goog.isString(code)) {
    throw 'Avatar ' + this.name + ' has invalid code: ' + code;
  }
  if ('Interpreter' in window) {
    this.interpreter = new Interpreter(code, this.battle_.initInterpreter);
  } else {
    this.interpreter = null;
  }
};

/**
 * Damage the avatar.
 * @param {number} add Amount of damage to add.
 */
Pond.Avatar.prototype.addDamage = function(add) {
  this.damage += add;
  if (this.damage >= 100) {
    this.die();
  }
};

/**
 * Kill this avatar.
 */
Pond.Avatar.prototype.die = function() {
  this.speed = 0;
  this.dead = true;
  this.damage = 100;
  this.battle_.RANK.unshift(this);
  this.battle_.EVENTS.push({'type': 'DIE', 'avatar': this});
  console.log(this + ' sinks.');
};

// API functions exposed to the user.

/**
 * Scan in a direction for the nearest avatar.
 * @param {number} degree Scan in this direction (wrapped to 0-360).
 * @param {number} opt_resolution Sensing resolution, 1 to 20 degrees.
 *   Defaults to 5.
 * @return {number} Distance (0 - ~141), or Infinity if no avatar detected.
 */
Pond.Avatar.prototype.scan = function(degree, opt_resolution) {
  var resolution;
  if (opt_resolution === undefined || opt_resolution === null) {
    resolution = 5;
  } else {
    resolution = opt_resolution;
  }
  if (!goog.isNumber(degree) || isNaN(degree) ||
      !goog.isNumber(resolution) || isNaN(resolution)) {
    throw TypeError;
  }
  degree = goog.math.standardAngle(degree);
  resolution = goog.math.clamp(resolution, 0, 20);

  this.battle_.EVENTS.push({'type': 'SCAN', 'avatar': this,
                            'degree': degree, 'resolution': resolution});

  // Compute both edges of the scan.
  var scan1 = goog.math.standardAngle(degree - resolution / 2);
  var scan2 = goog.math.standardAngle(degree + resolution / 2);
  if (scan1 > scan2) {
    scan2 += 360;
  }
  var locX = this.loc.x;
  var locY = this.loc.y;
  // Check every enemy for existance in the scan beam.
  var closest = Infinity;
  for (var i = 0, enemy; enemy = this.battle_.AVATARS[i]; i++) {
    if (enemy == this || enemy.dead) {
      continue;
    }
    var ex = enemy.loc.x;
    var ey = enemy.loc.y;
    // Pythagorean theorem to find range to enemy's centre.
    var range = Math.sqrt((ey - locY) * (ey - locY) +
                          (ex - locX) * (ex - locX));
    if (range >= closest) {
      continue;
    }
    // Compute angle between avatar and enemy's centre.
    var angle = Math.atan2(ey - locY, ex - locX);
    angle = goog.math.standardAngle(goog.math.toDegrees(angle));
    // Raise angle by 360 if needed (handles wrapping).
    if (angle < scan1) {
      angle += 360;
    }
    // Check if enemy is within scan edges.
    if (scan1 <= angle && angle <= scan2) {
      closest = range;
    }
  }
  return closest;
};

/**
 * Commands the avatar to move in the specified heading at the specified speed.
 * @param {number} degree Heading (0-360).
 * @param {number} opt_speed Desired speed (0-100).  Defaults to 50.
 */
Pond.Avatar.prototype.drive = function(degree, opt_speed) {
  var speed;
  if (opt_speed === undefined || opt_speed === null) {
    speed = 50;
  } else {
    speed = opt_speed;
  }
  if (!goog.isNumber(degree) || isNaN(degree) ||
      !goog.isNumber(speed) || isNaN(speed)) {
    throw TypeError;
  }
  var desiredDegree = goog.math.standardAngle(degree);
  if (this.degree != desiredDegree) {
    if (this.speed <= 50) {
      // Changes in direction can be negotiated at speeds of less than 50%.
      this.degree = goog.math.standardAngle(degree);
      this.facing = this.degree;
    } else {
      // Stop the avatar if an over-speed turn was commanded.
      speed = 0;
    }
  }
  if (this.speed == 0 && speed > 0) {
    // If starting, bump the speed immediately so that avatars can see a change.
    this.speed = 0.1;
  }
  this.desiredSpeed = goog.math.clamp(speed, 0, 100);
};

/**
 * Commands the avatar to stop.
 */
Pond.Avatar.prototype.stop = function() {
  this.desiredSpeed = 0;
};

/**
 * Commands the avatar to shoot in the specified heading at the specified range.
 * @param {number} degree Heading (0-360).
 * @param {number} range Distance to impact (0-70).
 * @return {boolean} True if cannon fired, false if still reloading from a
 *     previous shot.
 */
Pond.Avatar.prototype.cannon = function(degree, range) {
  if (!goog.isNumber(degree) || isNaN(degree) ||
      !goog.isNumber(range) || isNaN(range)) {
    throw TypeError;
  }
  var now = Date.now();
  if (this.lastMissile + this.battle_.RELOAD_TIME * 1000 > now) {
    return false;
  }
  this.lastMissile = now;
  var startLoc = this.loc.clone();
  degree = goog.math.standardAngle(degree);
  this.facing = degree;
  range = goog.math.clamp(range, 0, 70);
  var endLoc = new goog.math.Coordinate(
      startLoc.x + goog.math.angleDx(degree, range),
      startLoc.y + goog.math.angleDy(degree, range));
  var missile = {
    avatar: this,
    startLoc: startLoc,
    degree: degree,
    range: range,
    endLoc: endLoc,
    progress: 0
  };
  this.battle_.MISSILES.push(missile);
  this.battle_.EVENTS.push({'type': 'BANG', 'avatar': this,
      'degree': missile.degree});
  return true;
};
