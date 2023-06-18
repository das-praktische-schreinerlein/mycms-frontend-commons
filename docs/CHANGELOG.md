# Changelog of MyCMS
 
# Versions

## 6.0.0
- bumped up deps
- use StaticPagesDataService instead of PDocDataService
- moved TextEditorComponent, FormUtils and GeoParserDeterminer to commons
- use StaticPagesDataService instead of PDocDataService
- renamed pdoc* to section
- moved layout-utils, noop-action, modal-functionality to commons
- frontend: add show-action as actiontag
- frontend: added abstract app-component

### new features
- moved TextEditorComponent, FormUtils and GeoParserDeterminer to commons

### improvements
- moved layout-utils, noop-action, modal-functionality to commons
- frontend: add show-action as actiontag
- frontend: extend CommonEnvironment

### bug fixes
- TextEditor, Page-Module: improve usage of desc_txt, desc_md...
- SearchPage/AlbumPage: fix spinner

### breaking changes
- bumped up deps
- use StaticPagesDataService instead of PDocDataService
- renamed pdoc* to section


## 5.7.0 (2023-03-18)
- added mediameta-component
- fixed ComponentUtils.hasNgChanged

### new features
- frontend: added mediameta-component

### improvements
- none

### bug fixes
- frontend: fixed ComponentUtils.hasNgChanged -> deep-equals sometimes dont identify get differences for arrays

### breaking changes
- none


## 5.6.0 (2023-01-19)
- bumped version up to be in sync with mycms-server-commons, mycms-commons
- fixed components if there are no facets
- added query-params to SearchFormResolver
- moved common geo-functionality to commons/geo-commons
- fixed visjs for routes
- improved imports for bootstrap-modules
- introduced abstract map-component

### new features
- none

### improvements
- frontend: added query-params to SearchFormResolver
- frontend: moved common geo-functionality to commons/geo-commons
- frontend: improved imports for bootstrap-modules
- frontend: introduced abstract map-component

### bug fixes
- frontend: fixed components if there are no facets
- frontend: fixed visjs for routes

### breaking changes
- none


## 5.5.0 (2022-08-29)
- bumped version up to be in sync with mycms-frontend-commons, mycms-commons
- fixed admin-area display of result-messages

### new features
- none

### improvements
- none

### bug fixes
- frontend: fixed admin-area display of result-messages

### breaking changes
- none


## 5.4.0 (2021-11-25)
- added support for ordering playlists

### new features
- none

### improvements
- frontend: added support for ordering playlists
- frontend: improved assign-forms

### bug fixes
- none

### breaking changes
- none


## 5.3.0 (2021-05-13)
- bumped version up to be in sync with mycms-server-commons, mycms-commons

### new features
- none

### improvements
- none

### bug fixes
- none

### breaking changes
- none


## 5.2.0 (2021-02-05)
- added admin-area

### new features
- frontend: added admin-area
- frontend: added duration-pipe
- frontend: added admin-area to common section-page and environment-config

### improvements
- none

### bug fixes
- none
 
### breaking changes
- none


## 5.1.0 (2020-12-20)
- improved autoplay and audioPlayer

### new features
- frontend: added common support for autoPlay and player

### improvements
- frontend: added actiontag for opening links
- frontend: improved layout of CommonDocAudioplayerComponent

### bug fixes
- frontend: fixed lightbox-service (use full-url)
 
### breaking changes
- none


## 5.0.0 (2020-08-26)
- upgraded all dev-dependencies to latest running
- build: use peerDependencies (HINT: dont use deep-equal >=2.0.0 its very slow)
- fixed frontend: IE 11 now functional (no more block rendering)
- added new common components

### new features
- frontend: added component to show ExtendedObjectProperties
- frontend: added component to assign joins
- frontend: added suggester-service

### improvements
- none

### bug fixes
- fixed frontend: IE 11 now functional (no more block rendering)
 
### breaking changes
- build: upgraded all dev-dependencies to latest
- build: use peerDependencies

### known issues
- none



## 4.5.0 (2020-07-11)
- improved create/save-handling
- fixed build-deps

### new features
- none

### improvements
- frontend: improved create/save-handling

### bug fixes
- build: fixed build-deps
 
### breaking changes
- none

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 4.4.0 (2020-05-24)
- fix some minor bugs

### new features
- none

### improvements
- none

### bug fixes
- frontend: fixed minor errors in map-component which result in no return of promise
- frontend: fixed error in type-component that type was activated when type-csv containing string not equals 
 
### breaking changes
- none

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 4.3.0 (2020-03-20)
- added simple route-editor to maps
- improved build-process
- moved common action-tag-components and navigation-components from mytourbook to frontend-commons

### new features
- frontend: added simple route-editor to maps
- frontend: added lastSearchUrlPredecessor and lastSearchUrlSuccessor to show/search-page
- frontend: moved common action-tag-components and navigation-components from mytourbook to frontend-commons

### improvements
- frontend: added area as geo-element for location-areas in maps
- frontend: geoutils to get localdate for trackpoint
- development: improved build-process - activated tests+coverage

### bug fixes
- frontend: fixed SimpleAngularBackendHttpClient
- frontend: fixed multiaction-manager
 
### breaking changes
- frontend: fixed resulttypes of actiontag-service

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 4.2.0 (2019-09-07)
- added new components for managing object-detection image-objects
- improved trackmanagement

### new features
- frontend: added new components for managing object-detection image-objects

### improvements
- frontend: improved trackmanagement

### bug fixes
- none
 
### breaking changes
- none

### known issues
- frontend: IE till 11 not functional (can block rendering sometimes)


## 4.1.0 (2019-02-11)
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


## 4.0.0 (2018-11-07)
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


## 3.0.0 (2018-10-10)
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


## 2.0.0 (2018-09-13)
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

## 1.0.0 (2018-09-02)
- initial version based on mytourbook-1.5.0

### new features
- none
 
### improvements
- initial version: everything is a improvement
 
### bug fixes
- initial version: none
 
### breaking changes
- initial version: none
