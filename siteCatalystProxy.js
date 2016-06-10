/****************************************************
* Function pass data through to s_code for reporting
**/

var siteCatalyst = {

  push:function(array){

    if (s) {

      var linkTrackVars = [];
      var customLinkVars = [];
      var trackingType;
      var linkName;
      var clickAction;
      var linkType;
      var property;

      for (var index in array) {
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
      siteCatalyst.cleanValues(array);

    } else {
      console.log('Adobe Site Catalyst not present');
    }
  },

  cleanValues:function(array){
    var property;
    for (var index in array) {
      if (array.hasOwnProperty(index)) {
        property = index;
        delete s[property];
      }
    }
  }
};
