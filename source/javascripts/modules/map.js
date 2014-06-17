(function() {
  define(['jquery', 'mapbox'], function(jquery, mapbox) {
    var Map;
    Map = function() {};
    Map.prototype = {
      init: function(wrapper_id) {
        this.wrapper_el = $("#" + wrapper_id);
        if (this.wrapper_el.length) {
          this.createMapAddOns();
          return this;
        }
        return null;
      },
      createMapAddOns: function() {
        this.header_el = this.createHeader('map_title');
        this.map_el = this.createMap('map_container');
        this.navigation_el = this.createNav('map_nav');
        this.explanation_el = this.createExplanation('map_explanation');
        this.footer_el = this.createFooter('map_footer');
      },
      createHeader: function(id) {
        var header, title;
        header = $("<header/>", {
          id: id
        });
        title = $("<h1/>");
        title.text("City of Toronto");
        header.append(title);
        this.wrapper_el.append(header);
        return header;
      },
      createMap: function(id) {
        var map_container;
        map_container = $('<main/>', {
          id: id
        });
        this.wrapper_el.append(map_container);
        this.map = L.mapbox.map(id, 'c4collins.igi0p9ob', {
          tilelayer: true,
          featureLayer: true,
          gridLayer: true,
          legendControl: false,
          shareControl: false,
          infoControl: false,
          center: [43.718286, -79.377712],
          zoom: 11,
          layers: null,
          minZoom: 0,
          maxZoom: 19,
          dragging: true,
          touchZoom: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          tap: true,
          tapTolerance: 15,
          trackResize: true,
          worldCopyJump: false,
          closePopupOnClick: true,
          bounceAtZoomLimits: true,
          keyboard: true,
          keyboardPanOffset: 80,
          keyboardZoomOffset: 1,
          inertia: true,
          intertiaDeceleration: 3000,
          inertiaMaxSpeed: 1500,
          zoomControl: true,
          attributionControl: true,
          zoomAnimationThreshold: 4
        });
        return map_container;
      },
      createNav: function(id) {
        var nav_container;
        nav_container = $('<nav/>', {
          id: id
        });
        this.wrapper_el.append(nav_container);
        return nav_container;
      },
      createExplanation: function(id) {
        var desc_container;
        desc_container = $('<div/>', {
          id: id
        });
        this.wrapper_el.append(desc_container);
        return desc_container;
      },
      createFooter: function(id) {
        var footer;
        footer = $('<footer/>', {
          id: id
        });
        this.wrapper_el.append(footer);
        return footer;
      }
    };
    return new Map;
  });

}).call(this);
