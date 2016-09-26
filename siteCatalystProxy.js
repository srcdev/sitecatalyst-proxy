/****************************************************
* Interface to pass data through to s_code for reporting
**/

var SiteCatalyst = (function (s) {  

/****************************************************
* Sitecatalyst will return unexpected values with s.t() so we save them to an object for later re-use
**/
  function saveInitialValues(){
    var taggingDefaults;

    if (typeof s === 'undefined') return;

    if (SiteCatalyst.taggingDefaults === null) {
      SiteCatalyst.taggingDefaults = taggingDefaults = {};
      
      var property;
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
  function restoreInitialValues(){
    var taggingDefaults = SiteCatalyst.taggingDefaults;

    if (typeof s === 'undefined') return;
    if (taggingDefaults === null) return;

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
  function cleanValues(options){
    var property;
    var i;

    for (i in options) {
      if (options.hasOwnProperty(i)) {
        property = i;
        delete s[property];
      }
    }
  };

  return {

    taggingDefaults: null,

    push: function(options) {

      if ( typeof s === 'undefined' ) {

        var useInitialPropertyReset = true,
            linkTrackVars = [],
            customLinkVars = [],
            trackingType,
            linkName,
            clickAction,
            linkType,
            property,
            i;

        if (useInitialPropertyReset) saveInitialValues(); 

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

        cleanValues(options);

        if (useInitialPropertyReset) restoreInitialValues();

      } else {

        console.error('Adobe Site Catalyst not present');

      }
    }

  };
})(s);
