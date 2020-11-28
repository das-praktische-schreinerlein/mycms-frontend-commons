# MyCMS-Frontend-Commons

MyCMS is a library for developing CMS-applications.
It's the software-stack behind the new portal-version [www.michas-ausflugstipps.de](https://www.michas-ausflugstipps.de/). 

For more information take a look at documentation:
- [changelog](docs/CHANGELOG.md) 
- [credits for used libraries](docs/CREDITS.md)

MyCMS-Frontend-Commons contains the services+utils for the client-part of an application as browser-components and services.

Some amazing Features
- common angular-services, directives, pipes, components
    - service to render html/markdown into page
    - simple http-backend
    - render dynamic components into page
    - layout-control on layout-events
- common geo-services, maps, compontents
    - map-components leaflet-maps or geo-profile-maps
    -  services gpx+geojson-parser/generator
    - ![leafletmap](docs/images/component-map.png)
    - ![profilemap](docs/images/component-profilemap.png)
- common layout-styles
- CommonDoc-angular-modules
    - fully generic or abstract components as pages/forms/lists/tagclouds/dashboards/videoplayer/musikcplayer and many others
    - ![list](docs/images/component-list.png)
    - ![tagcloud](docs/images/component-tagcloud.png)
    - ![dashboard](docs/images/component-dashboard.png)
    - ![formelements](docs/images/component-formelements.png)
- PDocRecord-angular-modules
    - fully components as pages/forms/lists and a full angular-module with common routes/resolver for a simple-page-application
    - ![sectionlist](docs/images/page-sectionlist.png)
