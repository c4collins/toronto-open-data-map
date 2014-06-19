define ['jquery', 'mapbox'], (jquery, mapbox)->
    Map = ()->
        @markerLayers = new L.layerGroup()
        return

    Map.prototype =
        init:(wrapper_id) ->
            @wrapper_el = $ "#" + wrapper_id
            if @wrapper_el.length
                @createMapAddOns()
                @addBikeshareData()
                return this
            return null
        createMapAddOns:->
            @header_el = @createHeader('map_title')
            @map_el = @createMap('map_container')
            @navigation_el = @createNav('map_nav')
            @explanation_el = @createExplanation('map_explanation')
            @footer_el = @createFooter('map_footer')
            return
        createHeader:(id) ->
            header = $ "<header/>", id:id
            title = $ "<h1/>"
            header.append title
            @wrapper_el.append header
            return header
        setHeader:(message)->
            @header_el.find('h1').text( message )
        createMap:(id) ->
            map_container = $ '<main/>', id:id
            @wrapper_el.append map_container
            @map = L.mapbox.map id, 'c4collins.igi0p9ob',
                tilelayer:true
                featureLayer:true
                gridLayer:true
                legendControl:false
                shareControl:false
                infoControl:false
                center: [43.718286, -79.377712]
                zoom: 11
                layers: null
                minZoom: 0
                maxZoom: 19
                dragging:true
                touchZoom: true
                scrollWheelZoom: true
                doubleClickZoom: true
                boxZoom: true
                tap: true
                tapTolerance: 15
                trackResize: true
                worldCopyJump: false
                closePopupOnClick: true
                bounceAtZoomLimits: true
                keyboard: true
                keyboardPanOffset: 80
                keyboardZoomOffset: 1
                inertia: true
                intertiaDeceleration: 3000
                inertiaMaxSpeed: 1500
                # inertiaThreshold: 24
                zoomControl: true
                attributionControl: true
                # fadeAnimation: true
                # zoomAnimation: true
                zoomAnimationThreshold: 4
                # markerZoomAnimation: true
            @setHeader "MapBox Map @ " + @map.getCenter()
            self = this
            @map.on 'moveend', ->
                self.setHeader "MapBox Map @ " + self.map.getCenter()
            @map.addLayer(@markerLayers);
            return map_container
        createNav:(id)->
            nav_container = $ '<nav/>', id:id
            @wrapper_el.append nav_container
            return nav_container
        createExplanation:(id)->
            desc_container = $ '<div/>', id:id
            @wrapper_el.append desc_container
            return desc_container
        createFooter:(id)->
            footer = $ '<footer/>', id:id
            @wrapper_el.append footer
            return footer
        addNewNavItem:(name)->
            button = $ "<button />", text:name, id:name.lower()
            @nav_el.append button
            return button
        getData:(url, cb, layer) ->
            self = this
            return $.get(url).success (d, s, x)-> cb d, s, x, layer, self
        addMarkerToMap:(data, icon, popup, layerGroup)->
            options = 
                riseOnHover: true
                title: data.options.title
                alt: data.options.alt
                opacity: data.options.opacity
            return layerGroup.addLayer new L.marker(data.loc, options).setIcon(icon).bindPopup(popup)

        addBikeshareData:->
            bikeshareLayer = new L.featureGroup();
            @markerLayers.addLayer bikeshareLayer
            @getData '/api/bikeshare', @createBikeshareMarkers, bikeshareLayer
            return
        createBikeshareMarkers: (d, status, XHR, bikeshareLayer, self)->
            for s in d.stations
                icon_size = 40
                icon = new L.icon(
                    "iconUrl": '../images/toronto_circle_logo.png'
                    "iconSize": [icon_size, icon_size]
                    "iconAnchor": [icon_size/2, icon_size]
                    "popupAnchor": [0, -icon_size/2]
                    "className": "bikeshareLogo"
                )
                data =
                    loc:L.latLng(s.lat, s.long)
                    options:
                        title:s.name
                        alt:s.name
                        opacity:parseInt(s.nbBikes)/(parseInt(s.nbEmptyDocks)+parseInt(s.nbBikes))
                if s.installed
                    popup = self.getBikesharePopup(s)
                    bikeshareLayer = self.addMarkerToMap(data, icon, popup, bikeshareLayer)
                else
                    console.info s.name + "is out of service"
            self.map.fitBounds bikeshareLayer.getBounds()
            return
        getBikesharePopup:(s)->
            name = $ "<h3 />", text:s.name.split(/\s\/\s|\/\s|\//).join(" at ")
            graph = $ "<div />", class:"graph"
            inner = $ "<div />", height:parseInt(s.nbBikes)/(parseInt(s.nbEmptyDocks)+parseInt(s.nbBikes))*100 + "%"
            graph.append inner

            numbikes = $ "<p />", class:"numBikes"
            bikes = $ "<span />", text: parseInt(s.nbBikes)
            numbikes.html(bikes[0].outerHTML + " bikes")

            numdocks = $ "<p />", class:"numDocks"
            docks = $ "<span />", text: parseInt(s.nbBikes) + parseInt(s.nbEmptyDocks)
            numdocks.html(docks[0].outerHTML + " docks")

            availability = $ "<aside />", text:Math.round(parseInt(s.nbBikes)/(parseInt(s.nbEmptyDocks)+parseInt(s.nbBikes))*100,5) + "%"
           
            updated = $ "<h5 />", text:"Updated: " + Math.round(((Date.now() - s.lastCommWithServer) / 1000) / 60, 2) + " mins"
            changed = $ "<h5 />", text:"Changed: " + Math.round(((Date.now() - s.latestUpdateTime) / 1000) / 60, 2) + " mins"

            container = $ "<div />", { id:s.id, class:"bikesharePopup"  }
            container.append name, graph, availability, numbikes, numdocks, updated, changed
            wrapper = $ "<div />"
            wrapper.append container
            return wrapper.html()
    return new Map