define ['jquery'], (jquery)->
    Site = ()->
        this.id = window.location.origin
        return

    Site.prototype =
        updateCopyrightYear: (class_name) ->
            $els = if class_name[0] isnt '.' then $('.' + class_name) else $ class_name
            year = new Date().getFullYear()
            s_year = 2014
            text = if year > s_year then s_year + "-" + year else s_year
            $els.text(text)
            return
        updateDateUpdated: (class_name) ->
            $els = if class_name[0] isnt '.' then $('.' + class_name) else $ class_name
            $els.text("June, 2014")
            return

        init: ->
            this.updateCopyrightYear '.js-data-copyright-year'
            this.updateDateUpdated '.js-data-updated-last'
            return

    return new Site