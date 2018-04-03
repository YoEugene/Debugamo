goog.provide('Debugging.utils');

// ex: "rgba({0}, {1}, {2}, {3})".format(r, g, b, a)
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
