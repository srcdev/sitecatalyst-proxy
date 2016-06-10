/****************************************************
* Function pass data through to s_code for reporting
**/

var siteCatalyst = {

  taggingDefaults: null,

  push:function(array){

    if (s) {

      var linkTrackVars = [];
      var customLinkVars = [];

      for (index in array) {
        if (array.hasOwnProperty(index)) {
          var property = index;
          var value = array[index];

          switch (property) {

            case "type":
              var trackingType = value;
              break;

            case "linkName":
              var linkName = value;
              break;

            case "clickAction":
              var clickAction = value;
              break;

            case "linkType":
              var linkType = value;
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
      siteCatalyst.cleanValues(array);

/****************************************************
* Reinstate properties set on page load
**/
      siteCatalyst.restoreInitialValues();

    } else {
      console.log('Adobe Site Catalyst not present');
    }
  },

  cleanValues:function(array){
    for (index in array) {
      if (array.hasOwnProperty(index)) {
        property = index;
        delete s[property];
      }
    }
  },

  saveInitialValues:function(){
    var taggingDefaults;

    if (typeof s === 'undefined') return;

    // Save a copy of all properties in omniture 's' object
    if (siteCatalyst.taggingDefaults === null) {
      siteCatalyst.taggingDefaults = taggingDefaults = {};
      for (prop in s) {
        if (!s.hasOwnProperty(prop)) continue;
        if (typeof s[prop] !== 'object' && typeof s[prop] !== 'function') {
          taggingDefaults[prop] = s[prop];
        }
      }
    }
  },

  restoreInitialValues:function(){
    var taggingDefaults = siteCatalyst.taggingDefaults;

    if (typeof s === 'undefined') return;
    if (taggingDefaults === null) return;

    // Run through omniture 's' object properties replacing with those in our copy made earlier
    for (prop in s) {
      if (!s.hasOwnProperty(prop)) continue;

      if (typeof s[prop] !== 'object' && typeof s[prop] !== 'function') {
        if (typeof taggingDefaults[prop] !== 'undefined') {
          s[prop] = taggingDefaults[prop];
        } else {
          delete s[prop];
        }
      }
    }
  }
}

/****************************************************
*   ON DOM Ready
**/
siteCatalyst.saveInitialValues();
