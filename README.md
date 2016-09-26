# Adobe Site Catalyst proxy
Proxy function for single page application to send tracking data to Adobe Site Catalyst.  

**NOTE:**
Assumes `s_code` has already been loaded and initialised on the page. This will create the global object `s` which provides functions `tl` and `t` that are used by this library.

## Table of contents

- [Setup](#setup)
- [Usage](#usage)
- [Options](#options)
- [Links](#links)
- [Simulate page load tracking](#simulate-page-load-tracking)
- [Track a click event](#track-a-click-event)
- [Track a navigation click](#track-a-navigation-click)

## Setup

Include the script, this will provide a global variable `SiteCatalyst` which is used to send events.

```html
<script src="siteCatalystProxy.js"></script>
```

## Useage

This interface will accept all internal Sitecatalyst properties and variables (props/eVars/event/etc) as attributes of an object.

If you're wanting to track a click, then you need to pass the following:

```javascript
SiteCatalyst.push({
  type:        'event',
  clickAction: 'click',
  linkType:    'o',
  prop1:       'prop1 value',
  prop12:      'prop12 value',
});
```

Page load events do not require these to be passed and will be ignored if set.  

```javascript
SiteCatalyst.push({
  prop1:  'prop1 value',
  prop12: 'prop12 value',
});
```

### Options

`SiteCatalyst.push` requires an object to be passed with attributes defining the type of event. The following options are available.

| Parameter   | Options                   | Required |
|-------------|---------------------------|----------|
| type        | 'load', 'event'           |     -    |
| clickAction | 'action', 'link'          |     -    |
| linkType    | 'o', 'e', 'd'             |     -    |
| linkName    | 'Download PDF'            |     -    |
| pageName    | 'Page name value'         |     -    |
| campaign    | 'Your campaign ID'        |     -    |
| channel     | 'Channel Goes Here'       |     -    |
| eVar        | 'eVar Value (e.g. eVar3)' |     -    |
| events      | 'event2 to event3'        |     -    |
| hier        | 'Hier string'             |     -    |
| prop        | 'prop value (e.g. prop2)' |     -    |
| products    | 'Product values go here'  |     -    |
| server      | 'UK Site'                 |     -    |

### Links

There are different link types (`linkType`).

| Option | Description |
|--------|-------------|
| o      | other       |
| e      | exit link   |
| e      | download    |

## Simulate page load tracking `s.t()`

Single page apps often load what to the user appears to be a new page, the following will track this as a page load **incrementing the page view counter**.

Simulated page load tracking uses customer link variables `s.t(customLinkVars)` which leave the initially set page properties, also prevents unwanted properties being transmitted.

**NOTE:**
Omnibug for Chrome still seems to exhibit a bug previously where it will display a s.t() triggered after page load as a click. You can verify the tracking request as a page load event by inpsecting the querystring in the 'Network' tab. 'pev_2' is the variable that send the s.tl() type, this if missing, results in a page view/load.

```javascript
SiteCatalyst.push({
  type:     'load',
  pageName: 'Page name value',
  pageType: 'errorPage',
});
```

## Track a click event `s.tl() without 500ms timeout`

Track an action on a page where there is no browser URL navigation, for example, opening/displaying a panel, download or forward/next buttons.

Tracking an action also overrides the default 500ms timeout as no navigation is instantiated.

```javascript
SiteCatalyst.push({
  type:        'event',
  clickAction: 'action',
  linkType:    'd',
  linkName:    'Download PDF',
});
```
## Track a navigation click `s.tl() with 500ms timeout`

Tracking where user has started an event that starts browser navigation. Site Catalyst has a built in 500ms timeout to allow reporting to complete prior the browser unloading to navigate locations.

**NOTE**: If the Site Catalyst call completes before the 500ms timeout, the timeout is cancelled and navigation will occur. This prevents an un-necessary delay for user.

```javascript
SiteCatalyst.push({
  type:        'event',
  clickAction: 'link',
  linkType:    'o',
  linkName:    'Your friendly link name',
});
```

[back to top](#table-of-contents)