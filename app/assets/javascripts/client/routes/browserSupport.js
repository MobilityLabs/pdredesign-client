var unsupportedBrowserPage = "outdated_browsers/browser_unsupported"

var firefoxOutdated = function() {
  if(bowser.firefox == true && bowser.version < "17.0") {
    window.location = unsupportedBrowserPage;
  }
}

var chromeOutdated = function() {
  if(bowser.chrome == true && bowser.version < "23.0") {
    window.location = unsupportedBrowserPage;
  }
}

var safariOutdated = function() {
  if(bowser.safari == true && bowser.version < "6") {
    window.location = unsupportedBrowserPages;
  }
}

var msieOutdated = function() {
  if(bowser.msie == true && bowser.version < "10") {
    window.location =  unsupportedBrowserPage;
  }
}

function redirectUnsupportedBrowsers() {
  firefoxOutdated();
  chromeOutdated();
  safariOutdated();
  msieOutdated();
}

redirectUnsupportedBrowsers();
