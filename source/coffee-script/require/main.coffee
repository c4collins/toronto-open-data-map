require.config paths:
    "jquery": "libs/jquery.min"
    "mapbox": "//api.tiles.mapbox.com/mapbox.js/v1.6.4/mapbox"

require ['jquery', 'mapbox', 'modules/site.min', 'modules/map.min'], (jquery, mapbox, site, map) ->

    if typeof define == "function" and define.amd and define.amd.jQuery
        define "jquery", [], ()-> return jQuery

    site.init()
    map = map.init("map_wrapper")
    if map isnt null
        console.log "MAP IS ALIVE!"