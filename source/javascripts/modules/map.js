(function() {
  define(['jquery', 'mapbox'], function(jquery, mapbox) {
    var Map;
    Map = function() {
      this.markerLayers = new L.layerGroup();
    };
    Map.prototype = {
      init: function(wrapper_id) {
        this.wrapper_el = $("#" + wrapper_id);
        if (this.wrapper_el.length) {
          this.createMapAddOns();
          this.addBikeshareData();
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
        header.append(title);
        this.wrapper_el.append(header);
        return header;
      },
      setHeader: function(message) {
        return this.header_el.find('h1').text(message);
      },
      createMap: function(id) {
        var map_container, self;
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
        this.setHeader("MapBox Map @ " + this.map.getCenter());
        self = this;
        this.map.on('moveend', function() {
          return self.setHeader("MapBox Map @ " + self.map.getCenter());
        });
        this.map.addLayer(this.markerLayers);
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
      },
      addNewNavItem: function(name) {
        var button;
        button = $("<button />", {
          text: name,
          id: name.lower()
        });
        this.nav_el.append(button);
        return button;
      },
      getData: function(url, cb, layer) {
        var self;
        self = this;
        return $.get(url).success(function(d, s, x) {
          return cb(d, s, x, layer, self);
        });
      },
      addMarkerToMap: function(data, icon, popup, layerGroup) {
        var options;
        options = {
          riseOnHover: true,
          title: data.options.title,
          alt: data.options.alt,
          opacity: data.options.opacity
        };
        return layerGroup.addLayer(new L.marker(data.loc, options).setIcon(icon).bindPopup(popup));
      },
      addBikeshareData: function() {
        var bikeshareLayer;
        bikeshareLayer = new L.featureGroup();
        this.markerLayers.addLayer(bikeshareLayer);
        this.getData('/api/bikeshare', this.createBikeshareMarkers, bikeshareLayer);
      },
      createBikeshareMarkers: function(d, status, XHR, bikeshareLayer, self) {
        var data, icon, icon_size, popup, s, _i, _len, _ref;
        _ref = d.stations;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          icon_size = 40;
          icon = new L.icon({
            "iconUrl": '../images/toronto_circle_logo.png',
            "iconSize": [icon_size, icon_size],
            "iconAnchor": [icon_size / 2, icon_size],
            "popupAnchor": [0, -icon_size / 2],
            "className": "bikeshareLogo"
          });
          data = {
            loc: L.latLng(s.lat, s.long),
            options: {
              title: s.name,
              alt: s.name,
              opacity: parseInt(s.nbBikes) / (parseInt(s.nbEmptyDocks) + parseInt(s.nbBikes))
            }
          };
          if (s.installed) {
            popup = self.getBikesharePopup(s);
            bikeshareLayer = self.addMarkerToMap(data, icon, popup, bikeshareLayer);
          } else {
            console.info(s.name + "is out of service");
          }
        }
        self.map.fitBounds(bikeshareLayer.getBounds());
      },
      getBikesharePopup: function(s) {
        var availability, bikes, changed, container, docks, graph, inner, name, numbikes, numdocks, updated, wrapper;
        name = $("<h3 />", {
          text: s.name.split(/\s\/\s|\/\s|\//).join(" at ")
        });
        graph = $("<div />", {
          "class": "graph"
        });
        inner = $("<div />", {
          height: parseInt(s.nbBikes) / (parseInt(s.nbEmptyDocks) + parseInt(s.nbBikes)) * 100 + "%"
        });
        graph.append(inner);
        numbikes = $("<p />", {
          "class": "numBikes"
        });
        bikes = $("<span />", {
          text: parseInt(s.nbBikes)
        });
        numbikes.html(bikes[0].outerHTML + " bikes");
        numdocks = $("<p />", {
          "class": "numDocks"
        });
        docks = $("<span />", {
          text: parseInt(s.nbBikes) + parseInt(s.nbEmptyDocks)
        });
        numdocks.html(docks[0].outerHTML + " docks");
        availability = $("<aside />", {
          text: Math.round(parseInt(s.nbBikes) / (parseInt(s.nbEmptyDocks) + parseInt(s.nbBikes)) * 100, 5) + "%"
        });
        updated = $("<h5 />", {
          text: "Updated: " + Math.round(((Date.now() - s.lastCommWithServer) / 1000) / 60, 2) + " mins"
        });
        changed = $("<h5 />", {
          text: "Changed: " + Math.round(((Date.now() - s.latestUpdateTime) / 1000) / 60, 2) + " mins"
        });
        container = $("<div />", {
          id: s.id,
          "class": "bikesharePopup"
        });
        container.append(name, graph, availability, numbikes, numdocks, updated, changed);
        wrapper = $("<div />");
        wrapper.append(container);
        return wrapper.html();
      }
    };
    return new Map;
  });

}).call(this);
