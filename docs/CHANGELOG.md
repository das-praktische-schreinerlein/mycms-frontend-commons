# Changelog of MyCMS
 
# Versions
 
## Planned

### new features
- none

### improvements
- none

### bug fixes
- frontend: IE till 11 not functional (can block rendering sometimes)
- frontend: fixed keyword-handing in cdoc-editform
 
### breaking changes
- frontend: migrate to angular6
- frontend: export "real" angular-modules


## 4.2.0
- added new components for managing object-detection image-objects

### new features
- frontend: added new components for managing object-detection image-objects

### improvements
- none

### bug fixes
- none
 
### breaking changes
- none

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 4.1.0
- improved build-process
- frontend: several improvements for maps, filters, itemlists

### new features
- none

### improvements
- improved build-process: cross-platform rm/mkdir/copy/patch
- frontend: added ability to center maps, change color, title, element-code
- frontend: added index-parameter to itemlists
- frontend: added valueprefix for generation of human readable filters

### bug fixes
- frontend: fixed cdoc-searchform beforeDoSearchPrepareValues-hook
 
### breaking changes
- none

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 4.0.0
- upgraded packages to be angular5/6-compatible
- added common layout-styles
- fixed minor bugs
- improved section-page with navigation
- bumped version up to be in sync with mycms
- added devtools

### new features
- added common layout-styles
- frontend: added sidebar-navigation/prev-next-navigation
- devtools: added devtools (synced-preview...)

### improvements
- frontend: added styles to filter components
- frontend: fixed print-styles

### bug fixes
- frontend: fixed trigger for rendering on navigation/layout-changes
- frontend: fixed nav-bar  
- frontend: fixed null-issue on ngChanges
- frontend: fixed null-issue on CommonDocTagState
- frontend: fixed pdoc-styles
 
### breaking changes
- upgraded packages to be angular5/6-compatible
- migrated packages (ngx-lightbox, ngx-toastr)
- migrated usage of Http to use HttpClient

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 3.0.0
- improvements on albumpage and actiontags

### new features
- frontend: added m3u-Export to albumpage
- frontend: multirecord-actions to mulatiaction-manager
- frontend: added playlist-export to action-service and search-components
- frontend: new component to show/filter listheader with initials of the name 
 
### improvements
- frontend: service-functions to save content as file in browser
- frontend: check profileConfigs on actiontags
- frontend: added template for albumpage
 
### bug fixes
- frontend: fixed action-handling 
 
### breaking changes
- none


## 2.0.0
- improved dependencies
- added multiactiontag-functionality

### new features
- none
 
### improvements
- bumped up and improved dependencies
- added CommonDocActionTagService
- added multiactiontag-functionality with header-component and add behavior to searchpage, inlinesearchpaage, list, list-item (moved from mymediacollection)
 
### bug fixes
- fixed tests
 
### breaking changes
- changed constructor for CommonDocActionsComponent
- changed constructor for CommonDocSearchPageComponent
- changed constructor for CommonDocInlineSearchpageComponent

## 1.0.0
- initial version based on mytourbook-1.5.0

### new features
- none
 
### improvements
- initial version: everything is a improvement
 
### bug fixes
- initial version: none
 
### breaking changes
- initial version: none
