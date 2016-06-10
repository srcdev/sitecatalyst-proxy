# sitecatalyst-proxy
Proxy function for single page application to send tracking data to Adobe Site Catalyst

## Track an action click s.tl()

Track an action on a page where there is no hyperlink to follow, for example, opening a panel or forward/next buttons.

````
siteCatalyst.push({
  type:           'click',
  clickAction:    'action',
  linkType:       'o',
  linkName:       'Your friendly link name', 
  pageName:       'Page name value', 
  pageType:       'errorPage',  // Omit this for a standard page
  campaign:       'Your campaign ID',
  channel:        'Channel | Goes | Here', 
  eVar31:         'eVar31 Value',
  eVar55:         'eVar55 Value',
  events:         'event2,event3',
  hier1:          'Hier string 1 | Hier string 2 | Hier string 3', 
  prop1:          'prop1 value',
  prop12:         'prop12 value',
  products:       'Product values go here',
  server:         'UK Site' 
});
````

