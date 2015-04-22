/**
 * @fileOverview - Utility for parsing querystring values
 */

var QueryStringParser = function(url) {
  var path = url || location.href;

  function setUrl(newUrl) {
    if( typeof newUrl === 'string' ) {
      path = newUrl;
    }
  }

  function getKeyValuePairs() {
    var parsedParams = path.split('?');

    if( parsedParams.length === 1 ) {
      return [];
    } else {
      return parsedParams[1].split('&');
    }
  }

  function getParam(param) {
    var keyValuePairs = getKeyValuePairs(),
      foundValue = null;

    for( var i = 0; i < keyValuePairs.length; i++ ) {
      var splitValues = keyValuePairs[i].split('=');

      if( splitValues.length > 1 && splitValues[0] === param ) {
        foundValue = splitValues[1];
      }
    }

    return foundValue;
  }

  return {
    setUrl: setUrl,
    getKeyValuePairs: getKeyValuePairs,
    getParam: getParam
  };
};
