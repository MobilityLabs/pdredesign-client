(function(){
  var unsupportedBrowserPage = "outdated_browsers/browser_unsupported"

  function isBrowserValid() {
    var validBrowser = true;
    switch(true) {
      case bowser.firefox == true && bowser.version < "17.0":
      case bowser.chrome  == true && bowser.version < "23.0":
      case bowser.safari  == true && bowser.version < "6":
      case bowser.msie    == true && bowser.version < "10":
        validBrowser = false;
        break;
    }

    return validBrowser;
  };

  if(!isBrowserValid()) window.location = unsupportedBrowserPage;

})();
