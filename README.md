#Adobe Site Catalyst proxy
Proxy function for single page application to send tracking data to Adobe Site Catalyst.  

Assumes `s_code` has already been loaded and initialised on the page.  

##Simulate page load tracking `s.t()`

Single page apps often load what to the user appears to be a new page, the following will track this as a page load **incrementing the page view counter**.

Simulated page load tracking uses customer link variables `s.t(customLinkVars)` which leave the initially set page properties, also prevents unwanted properties being transmitted.

````javascript
siteCatalyst.push({
  type:           'load',
  pageName:       'Page name value', 
  pageType:       'errorPage',
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

##Track an action click `s.tl()`

Track an action on a page where there is no hyperlink to follow, for example, opening a panel or forward/next buttons.

###Options

`linkType:'o',` 

* `'o'` > Other
* `'e'` > Exit link
* `'d'` > Download

````javascript
siteCatalyst.push({
  type:           'click',
  clickAction:    'action',
  linkType:       'd',
  linkName:       'Download PDF', 
  pageName:       'Page name value', 
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
##Track a link click `s.tl()`

Track an action on a page where there is no hyperlink to follow, for example, opening a panel or forward/next buttons.

###Options

`linkType:'o',` 

* `'o'` > Other
* `'e'` > Exit link
* `'d'` > Download

````javascript
siteCatalyst.push({
  type:           'click',
  clickAction:    'link',
  linkType:       'o',
  linkName:       'Your friendly link name', 
  pageName:       'Page name value', 
  pageType:       'errorPage',
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

