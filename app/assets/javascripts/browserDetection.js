var BrowserDetector = {
  unsupportedBrowserPage: "outdated_browsers/browser_unsupported",
  isBrowserValid: function(lib) {
    var validBrowser = true;
    var version      = parseFloat(lib.version);

    switch(true) {
      case lib.firefox == true && version < 17.0:
      case lib.chrome  == true && version < 23.0:
      case lib.safari  == true && version < 6:
      case lib.msie    == true && version < 9:
        validBrowser = false;
        break;
      default:
        validBrowser = true;
    }

    return validBrowser;
  },
  redirect: function() {
    window.location = unsupportedBrowserPage;
  },
  redirectInvalidBrowser: function(lib){
    if(!this.isBrowserValid(lib))
      this.redirect();
  },
};


(function(){
  BrowserDetector.redirectInvalidBrowser(bowser);
})();
