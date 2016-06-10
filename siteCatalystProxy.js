/****************************************************
* Function pass data through to s_code for reporting
**/

siteCatalyst.push({
  type:           'click',      //  'click' - Non page load action, don't increment page counter
  clickAction:    'action',       //  ''/'link'/'action' - Empty value if type = load / Follow or link / Trigger an action, eg, display an overlay, close an option
  linkType:       'o',          //  ''/o'/'e'/'d' - Only used with 'type:click'. Omniture's Custom Link property ('o'ther, 'd'ownload, 'e'xit)
  linkName:       'Your friendly link name', 
  pageName:       'Page name value', 
  pageType:       'errorPage',  // Omit this for a standard page
  campaign:       'Your campaign ID', // (eVar0) can be set via site catalyst internal function - s.getQueryParam('cid') 
  channel:        'Channel | Goes | Here', 
  eVar31:         'eVar31 Value',
  eVar55:         'eVar55 Value',
  events:         'event2,event3',
  hier1:          'Hier string 1 | Hier string 2 | Hier string 3', // hier1/2/3/4/5 - Ensure you pay attention to how these are created to prevent errors in reports
  prop1:          'prop1 value',
  prop12:         'prop12 value',
  products:       'Product values go here',
  server:         'UK Site' 
});

siteCatalyst.push({
  type:           'load',       //  'load' increment page visit counter
  pageName:       'Page name value', 
  pageType:       'errorPage',  // Omit this for a standard page
  campaign:       'Your campaign ID', // (eVar0) can be set via site catalyst internal function - s.getQueryParam('cid') 
  channel:        'Channel | Goes | Here', 
  eVar31:         'eVar31 Value',
  eVar55:         'eVar55 Value',
  events:         'event2,event3',
  hier1:          'Hier string 1 | Hier string 2 | Hier string 3', // hier1/2/3/4/5 - Ensure you pay attention to how these are created to prevent errors in reports
  prop1:          'prop1 value',
  prop12:         'prop12 value',
  products:       'Product values go here',
  server:         'UK Site' 
});

var siteCatalyst = {

  taggingDefaults: null,

  push:function(array){

    if (s) {

      var linkTrackVars = [];

      for (var index in array) {
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
//      s = s_gi(s_account);  // Set Omniture account

      if (trackingType === 'load') {

        console.log('Sending "LOAD"');

//        s.t();
        s = s_gi(s_account);  // Set Omniture account
        var s_code = s.t();
        if (s_code) document.write(s_code);

      } else {

        console.log('Sending "CLICK"');

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
    for (var index in array) {
      if (array.hasOwnProperty(index)) {
        property = index;
        s[property] = null;
      } 
    }
  },

  saveInitialValues:function(){
    var taggingDefaults;

    if (typeof s === 'undefined') return;

    // Save a copy of all properties in omniture 's' object
    if(siteCatalyst.taggingDefaults === null) {
      siteCatalyst.taggingDefaults = taggingDefaults = {};
      for(var prop in s) {
        if(!s.hasOwnProperty(prop)) continue;
        if(typeof s[prop] !== 'object' && typeof s[prop] !== 'function') {
          taggingDefaults[prop] = s[prop];
        }
      }
    }
  },

  restoreInitialValues:function(){
    var taggingDefaults = siteCatalyst.taggingDefaults;

    if (typeof s === 'undefined') return;
    if (taggingDefaults === null) return;

    console.log('Resetting defaults');

    // Run through omniture 's' object properties replacing with those in our copy made earlier
    for (var prop in s) {
      if (!s.hasOwnProperty(prop)) continue;

      if(typeof s[prop] !== 'object' && typeof s[prop] !== 'function') {
        if(typeof taggingDefaults[prop] !== 'undefined') {
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
