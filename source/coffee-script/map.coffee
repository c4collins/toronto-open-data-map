define ['jquery', 'mapbox'], (jquery, mapbox)->
    Map = ()->
        
        return

    Map.prototype =
        init:(wrapper_id) ->
            @wrapper_el = $ "#" + wrapper_id
            if @wrapper_el.length
                @createMapAddOns()
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
            title.text("City of Toronto")
            header.append title
            @wrapper_el.append header
            return header
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

    return new Map