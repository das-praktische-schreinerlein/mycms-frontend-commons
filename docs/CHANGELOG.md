# Changelog of MyCMS
 
# Versions
 
## 4.0.0
- upgraded packages to be angular5/6-compatible

### new features
- none

### improvements
- none

### bug fixes
- none
 
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
