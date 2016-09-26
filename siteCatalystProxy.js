/****************************************************
* Interface to pass data through to s_code for reporting
**/

var SiteCatalyst = (function() {

/****************************************************
* Sitecatalyst will return unexpected values with s.t() so we save them to an object for later re-use
**/
  function saveInitialValues() {

    if (SiteCatalyst.taggingDefaults === null) {

      var taggingDefaults;
      var property;
      
      SiteCatalyst.taggingDefaults = taggingDefaults = {};      

      for (property in s) {

        if (!s.hasOwnProperty(property)) continue;
        if (typeof s[property] !== 'undefined' && typeof s[property] !== 'object' && typeof s[property] !== 'function') {
          taggingDefaults[property] = s[property];
        }

      }
    }
  };

/****************************************************
* Restore previously saved Sitecatalyst properties.
**/
  function restoreInitialValues() {

    if (taggingDefaults === null) {
      return;
    }

    var taggingDefaults = SiteCatalyst.taggingDefaults;
    var property;

    for (property in s) {

      if (!s.hasOwnProperty(property)) continue;

      if (typeof s[property] !== 'object' && typeof s[property] !== 'function') {

        if (typeof taggingDefaults[property] !== 'undefined') {
          s[property] = taggingDefaults[property];
        } else {
          delete s[property];
        }

      }
    }
  };

/****************************************************
* Clear down properties created for s.tl()
**/
  function cleanValues(options) {
    var property;
    var i;

    for (i in options) {
      if (options.hasOwnProperty(i)) {
        property = i;
        delete s[property];
      }
    }
  };

  function push(options) {

    if ( typeof s !== 'undefined' ) {

      var linkTrackVars = [],
          customLinkVars = [],
          trackingType,
          linkName,
          clickAction,
          linkType,
          property,
          i;

      this.saveInitialValues();

      for (i in options) {

        if (options.hasOwnProperty(i)) {

          property = i;
          var value = options[i];

          switch (property) {

            case "type":
              trackingType = value;
              break;

            case "linkName":
              linkName = value;
              break;

            case "clickAction":
              clickAction = value;
              break;

            case "linkType":
              linkType = value;
              break;

            default:
              s[property] = value;
              customLinkVars[property] = value;
              linkTrackVars.push(property);
              break;
          }
        }
      }

/****************************************************
* Create the s_code call and send analytics
**/
      s.linkTrackEvents = s.events;
      s.linkTrackVars   = linkTrackVars.join(',');

      if (trackingType === 'load') {

        s.t(customLinkVars);

      } else {

        if (typeof linkName === 'undefined') {
          linkName = 'Non page load event [s.tl()]';
        }

        switch (clickAction) {
          case 'action':
            s.tl(true,linkType,linkName,null,null);
            break;
          
          case 'link':
            s.tl(this,linkType,linkName,null,null);
            break;
        }
      }

/****************************************************
* Clear down properties we've just set
**/
      linkTrackVars = null;
      trackingType  = null;
      linkName      = null;
      clickAction   = null;
      linkType      = null;

      this.cleanValues(options);
      this.restoreInitialValues();

    } else {

      console.error('Adobe Site Catalyst not present');

    }
  }

  return {
    taggingDefaults:      null,
    push:                 push,
    cleanValues:          cleanValues,
    saveInitialValues:    saveInitialValues,
    restoreInitialValues: restoreInitialValues,
  };

})();
