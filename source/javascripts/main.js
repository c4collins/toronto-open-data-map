(function() {
  require.config({
    paths: {
      "jquery": "libs/jquery.min",
      "mapbox": "//api.tiles.mapbox.com/mapbox.js/v1.6.4/mapbox"
    }
  });

  require(['jquery', 'mapbox', 'modules/site.min', 'modules/map.min'], function(jquery, mapbox, site, map) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
      define("jquery", [], function() {
        return jQuery;
      });
    }
    site.init();
    map = map.init("map_wrapper");
    if (map !== null) {
      return console.log("MAP IS ALIVE!");
    }
  });

}).call(this);
