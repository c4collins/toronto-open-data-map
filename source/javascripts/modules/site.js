(function() {
  define(['jquery'], function(jquery) {
    var Site;
    Site = function() {
      this.id = window.location.origin;
    };
    Site.prototype = {
      updateCopyrightYear: function(class_name) {
        var $els, s_year, text, year;
        $els = class_name[0] !== '.' ? $('.' + class_name) : $(class_name);
        year = new Date().getFullYear();
        s_year = 2014;
        text = year > s_year ? s_year + "-" + year : s_year;
        $els.text(text);
      },
      updateDateUpdated: function(class_name) {
        var $els;
        $els = class_name[0] !== '.' ? $('.' + class_name) : $(class_name);
        $els.text("June, 2014");
      },
      init: function() {
        this.updateCopyrightYear('.js-data-copyright-year');
        this.updateDateUpdated('.js-data-updated-last');
      }
    };
    return new Site;
  });

}).call(this);
