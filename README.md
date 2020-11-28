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
    - full components as pages/forms/lists and a full angular-module with common routes/resolver for a simple-page-application
    - ![sectionlist](docs/images/page-sectionlist.png)
    - simple configuration of pages in pdocs-de.json if you use the static PDocDataService.
```
{
 "pdocs": [
  {
   "id": "menu",
   "descMd": "Hauptmenü",
   "flgShowTopTen": false,
   "flgShowSearch": false,
   "heading": "Hauptmenü",
   "name": "Hauptmenü",
   "subSectionIds": "start,vita,roadmap",
   "teaser": "Hauptmenü",
   "type": "SectionOverviewPage"
  },
  {
   "id": "start",
   "descMd": "# Ieiunia non dempto\n\n## Quem incursant\n\nLorem markdownum et ille luctor. Magno et sive inpia adurat oraque. Nulla uror\naequatam iustius vocem nec euntis hominem Euphorbus contigit.\n\n1. Videntur Cyllare mortale vota hedera possint\n2. Ignoscere putat Melas mugiat nisi pariter\n3. Hac fortunatumque forte volat Phocus occupat\n4. Terras facit\n\n## Peneos illi tractoque canos mirantem fragorem\n\n*Thalamos* nec ab vaporibus per petiit Ilus et trabeati curvavit virginis;\ntenes. Quia dedit divum parat, orbi neque vestigia inmane pars de per!\nCarminibus quoque pontum [tyranni](#nec-secum-non) mihi caelo reparata sunt\nmaeonis.\n\n    if (apiTroll(subdirectoryWaveform, lion(ssd_udp))) {\n        bit += threading;\n        hacker = 5;\n        type.stick = 69;\n    } else {\n        key += data + key_disk_rss;\n        software(27, ipvShortcut(e, mbr_twitter));\n        xml = burn;\n    }\n    if (4 < copyright.threading.keyboard_hibernate(so_unc_lun, mainframeDial,\n            81)) {\n        file.midiBespoke = nui(mcaIntegerCloud(php, publishing, 5));\n        intelligenceKilobit += fileDatabaseIp;\n    } else {\n        aclFaq.php = baseband_dial_raw - ctr_page_wpa(horizontal_intelligence,\n                gigaflopsFont);\n        clientPrimary += portBash(file_flash);\n    }\n    if (cell_portal >= alignment) {\n        ramParallelLink = lifo + 3;\n        dragAdapter += ecc_dram_troll;\n    } else {\n        pretest(ad_yobibyte, andCable);\n        mpMicrocomputer = token_primary / 953245;\n    }\n\nParva versae, et dolor in telo mens et coronatae putares lexque est *decidit\nenixa* tuam [cum](#praeda), Althaea. Contortum nulli utque fulgentia comites, et\nuni dixere feremus, hoc rapta costas Phoenissa dedecus vires.\n\n## Unus montibus septem lacrimae ad medio spectante\n\nVana sed cape, ut intrat cantato saepes sacra adversum tellure meosque ut sed\ncorpore iuveni neque. Priami urbesque cum: pugnabam manet et **transit**\ncustodia mandato, cadis. Huius illis tumefactum Charybdis voluere! Virorum remis\nmedicas lacrimis Iuppiter furta, venenis oculosque, tamen, praecluditur [tuae\nhoc](#his) moveat numquam pudibundaque victus!\n\n1. Fratre Phoebus apertum rapuere densis medio Halcyoneus\n2. Avus quoque\n3. Sub dat meritisne Ausoniae illos atlas\n\nMaturae caesariem protinus pascere videretur, partes. Patitur nympham; non cavas\nfidem. Vias casu *Cinyras ne inde*. **Radiorum ad** tibi mento: pelagoque de\npervia flammamque est coniunctaque meis horrendus laboriferi Veneris fractis\noraque Cadmeides. Gloria et nox locum lucem, sed **et** cum praecordia tamen ad\nturris iecit Thracia manu.",
   "flgShowTopTen": false,
   "flgShowNews": false,
   "flgShowSearch": false,
   "heading": "Thats MySimpleHomePage",
   "name": "Willkommen",
   "subSectionIds": "skills,me",
   "teaser": "Willkommen bei MySimpleHomePage",
   "type": "SectionOverviewPage"
  },
```
    
