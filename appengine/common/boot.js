/**
 * Blockly Games: Bootloader
 *
 * Copyright 2014 Google Inc.
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
 * @fileoverview Load the correct language pack for the current application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

(function() {
  // Application path.
  var appName = location.pathname.match(/\/([-\w]+)(\.html)?$/);
  appName = appName ? appName[1].replace('-', '/') : 'index';

  // Supported languages (consistent across all apps).
  window['BlocklyGamesLanguages'] = [
      // 'ar', 'be-tarask', 'br', 'ca', 'cs', 'da', 'de', 'bg', 'el', 
      'en',
      // 'es', 'eu', 'fa', 'fi', 'fr', 'gl', 'he', 'hrx', 'hu', 'ia', 'id',
      // 'is', 'it', 'ja', 'ko', 'lt', 'lv', 'mk', 'ms', 'nb', 'nl', 'pl',
      // 'pms', 'pt', 'pt-br', 'ro', 'ru', 'sc', 'sco', 'sk', 'sr', 'sv',
      // 'ta', 'th', 'tr', 'uk', 'vi', 'zh-hans', 
      'zh-hant'
      ];

  // Use a series of heuristics that determine the likely language of this user.
  // First choice: The URL specified language.
  var param = window.location.search.match(/[?&]lang=([^&]+)/);
  var lang = param ? param[1].replace(/\+/g, '%20') : null;
  if (window['BlocklyGamesLanguages'].indexOf(lang) != -1) {
    // Save this explicit choice as cookie.
    document.cookie = 'lang=' + escape(lang) + '; path=/';
  } else {
    // Second choice: Language cookie.
    var cookie = document.cookie.match(/(^|;)\s*lang=(\w+)/);
    lang = cookie ? unescape(cookie[2]) : null;
    if (window['BlocklyGamesLanguages'].indexOf(lang) == -1) {
      // Third choice: The browser's language.
      lang = navigator.language;
      if (window['BlocklyGamesLanguages'].indexOf(lang) == -1) {
        // Fourth choice: Zh-Hant.
        lang = 'zh-hant';
      }
    }
  }
  window['BlocklyGamesLang'] = lang;

  var debug = false;
  try {
    debug = !!localStorage.getItem('debug');
    if (debug) {
      console.info('Loading uncompressed JavaScript.');
    }
  } catch (e) {
    // Don't even think of throwing an error.
  }
  // var debug = true;

  // DebugamO: add done property into localStorage
  if (!window.localStorage.hasOwnProperty('done')) {
    window.localStorage.setItem('done', JSON.stringify([]));
  }

  var maxDoneLevel = JSON.parse(window.localStorage.done).length;

  window.localStorage.setItem('maxDoneLevel', maxDoneLevel);

  if (!window.localStorage.hasOwnProperty('newPlayer')) {
    window.localStorage.setItem('newPlayer', 1);
  }

  // Load the chosen language pack.
  var script = document.createElement('script');

  script.src = appName + '/generated/' + lang +
      (debug ? '/uncompressed.js' : '/compressed.js');
  if (appName === "shop") {
      script.src = appName + '/public/generated/' + lang +
      (debug ? '/uncompressed.js' : '/compressed.js');
  }
  if (appName === "debugging") {
      script.src = appName + '/public/generated/' + lang +
      (debug ? '/uncompressed.js' : '/compressed.js');
  }
  script.type = 'text/javascript';
  document.head.appendChild(script);
})();
