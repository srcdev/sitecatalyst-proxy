#Adobe Site Catalyst proxy
Proxy function for single page application to send tracking data to Adobe Site Catalyst.  

Assumes `s_code` has already been loaded and initialised on the page.  

##Useage

This interface will accept all internal Sitecatalyst properties and variables (props/eVars/event/etc)

If you're wanting to track a click `type:'click'` then `clickAction:'[action/lick]'` and `linkType:'[o/d/e]',` must also be passed. Page load events do not require these to be passed and will be ignored if set.  
  
##Simulate page load tracking `s.t()`

Single page apps often load what to the user appears to be a new page, the following will track this as a page load **incrementing the page view counter**.

Simulated page load tracking uses customer link variables `s.t(customLinkVars)` which leave the initially set page properties, also prevents unwanted properties being transmitted.

###NOTE: Omnibug for Chrome still seems to exhibit a bug previously where it will display a s.t() triggered after page load as a click. You can verify the tracking request as a page load event by inpsecting the querystring in the 'Network' tab. 'pev_2' is the variable that send the s.tl() type, this if missing, results in a page view/load.

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

##Track a click event `s.tl() without 500ms timout`

Track an action on a page where there is no browser URL navigation, for example, opening/displaying a panel, download or forward/next buttons.

Tracking an action also overrides the default 500ms timeout as no navigation is instantiated.

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
##Track a navigation click `s.tl() with 500ms timout` 

Tracking where user has started an event that starts browser navigation. Site Catalyst has a built in 500ms timeout to allow reporting to complete prior the browser unloading to navigate locations.

NOTE: If the Site Catalyst call completes before the 500ms timeout, the timeout is cancelled and navigation will occur. This prevents an un-necessary delay for user. 

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

