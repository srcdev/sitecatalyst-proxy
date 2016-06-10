# sitecatalyst-proxy
Proxy function for single page application to send tracking data to Adobe Site Catalyst

## Track an action click

````
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
````

