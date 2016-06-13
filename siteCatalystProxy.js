/****************************************************
* Interface to pass data through to s_code for reporting
**/

var SiteCatalyst = (function () {  

/****************************************************
* Sitecatalyst will return unexpected values with s.t() so we save them to an object for later re-use
**/
  var saveInitialValues = function(){
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
  var restoreInitialValues = function(){
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
  var cleanValues = function(array){
    var property,
        index;

    for (index in array) {
      if (array.hasOwnProperty(index)) {
        property = index;
        delete s[property];
      }
    }
  };

  return {
    taggingDefaults: null,

    push:function(array){

      if (s) {

        var useInitialPropertyReset = true,
            linkTrackVars = [],
            customLinkVars = [],
            trackingType,
            linkName,
            clickAction,
            linkType,
            property,
            index;

        if (useInitialPropertyReset) saveInitialValues(); 

        for (index in array) {
          if (array.hasOwnProperty(index)) {
            property = index;
            var value = array[index];

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
        s.linkTrackVars = linkTrackVars.join(',');

        if (trackingType === 'load') {

          s.t(customLinkVars);

        } else {

          switch (clickAction) {
            case 'action':
              s.tl(this,linkType,linkName,null,null);
              break;
            
            case 'link':
              s.tl(true,linkType,linkName,null,null);
              break;
          }
        }

/****************************************************
* Clear down properties we've just set
**/
        linkTrackVars = null;
        trackingType = null;
        linkName = null;
        clickAction = null;
        linkType = null;
        cleanValues(array);

        if (useInitialPropertyReset) restoreInitialValues();

      } else {
        console.log('Adobe Site Catalyst not present');
      }
    }

  };
})();
