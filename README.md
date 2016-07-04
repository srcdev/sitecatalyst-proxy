#Adobe Site Catalyst proxy
Proxy function for single page application to send tracking data to Adobe Site Catalyst.  

Assumes `s_code` has already been loaded and initialised on the page.  

##Useage

This interface will accept all internal Sitecatalyst properties and variables (props/eVars/event/etc)

If you're wanting to track a click `type:'click'` then `clickAction:'[action/lick]'` and `linkType:'[o/d/e]',` must also be passed. Page load events do not require these to be passed and will be ignored if set.  
  
##Simulate page load tracking `s.t()`

Single page apps often load what to the user appears to be a new page, the following will track this as a page load **incrementing the page view counter**.

Simulated page load tracking uses customer link variables `s.t(customLinkVars)` which leave the initially set page properties, also prevents unwanted properties being transmitted.

````javascript
SiteCatalyst.push({
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

##Track an event `s.tl()`

Track an action on a page where there is no hyperlink to follow, for example, opening/displaying a panel, download or forward/next buttons.

###Options

`linkType:'o',` 

* `'o'` > Other
* `'e'` > Exit link
* `'d'` > Download

````javascript
SiteCatalyst.push({
  type:           'event',
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
##Track a  click `s.tl()`

Track a link click.

###Options

`linkType:'o',` 

* `'o'` > Other
* `'e'` > Exit link
* `'d'` > Download

````javascript
SiteCatalyst.push({
  type:           'event',
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

