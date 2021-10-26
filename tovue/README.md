# Forsyningsdataportal
Forsyningsdataportal udstiller forsyningsdata fra danmark. Websitet gør datatilgængelig i form af forskellige visninger (tabelvisning, kortvisning og som indlejret powerBi dashboard), som downloads iform af f.eks. CSV eller Geopackage, samt via webservices som REST eller WMS.

Dette dokument har til formål at gøre det lettere for andre udviklere at videreudvikle på Forsyningsdataportal.

## Frameworks og libraries
Frontenden er bygget i Vue 2 med single file components og vue-router samt en modulær vuex store.
Der bruges følgende 3.parts libraries:
- Sanitize.ccs
- smoothscroll-polyfill
- Axios
- [Vue Tooltip](https://github.com/Akryum/v-tooltip#readme) til at vise tooltips og popovers - baseret på popper.js
- [pepjs](https://github.com/jquery/PEP#readme) som fixer problemer med Open Layers i safari
- [Open layers](http://openlayers.org/) og [proj4](https://github.com/proj4js/proj4js#readme) til kortvisning
- [Mobile-device-detect](https://github.com/duskload/mobile-device-detect#readme) til at håndtere mobilvisning
- [Vanillaes/cvs](https://github.com/vanillaes/csv) til csv formatering


## Kode fra Dataforsyningen og Okapi
Dele af koden er inspireret af eller bygget ovenpå kode fra Forsyningsdata, samt (ifm. kortvisning) kode fra Okapi. Dette skulle forhåbentlig gøre det lettere for udviklere med kendskab til disse at bygge videre på Forsyningsdataportalen.

## Data
Data hentes fra PimCore via elesticSearch, samt fra forsyningsdataportalens egen REST services. Find listen over endpoints i /store/shared/Paths.js

En del data (hovedsageligt metadata om de tilgængelige datasæt, samt opsætning af de forskellige datasæts visninger) ligger i filen MetaData.js. 

## Guide til tilføjelse af dashboard-view
Tilføjelse af et view til et eksisterende datasæt klares let ved at tilføje et view object til views array under det specifikke datasæt under datasetMeta i filen MetaData.js. 

##### Eksempel:
    views: [
      { label: 'Tabel', type: 'table' },
      { label: 'Figurer og Tal', type: 'dashboard' }
    ]

Desuden tilføjes et settingsobject som passer til den tilføjede view-type. (Se de forskellige settingsobjecter under 'Guide til oprrettelse af nyt datasæt')

##### Eksempel:
    dashboardSettings: {
      powerBiUrl: 'DinUrlHer'
    }

## Guide til oprettelse af nyt datasæt
Nye datasæt tilføjes Forsyningsdataportalen i fire trin.
1. Nyt produkt oprettes i PimCore og tagges 'Forsyningsdata_test' 
2. Data opsætning og info tilføjes til objectet datasetMeta i filen MetaData.js. Key skal være id på det nye produkt i PimCore. (se gennemgang af datasetMeta nedenfor)
3. Hvis data skal parses forskelligt til forskellige views gøres dette i /store/dataset/DatasetData
4. Når datasættet er testet og MetaData.js er pushet til produktion ændres tagget til 'Forsyningsdata' og dermed vises datasættet på forsyningsdataportal.dk

### DatasetMeta
Objectet datasetMeta (i filen MetaData.js) indeholder indstillinger for alle de viste datasæt. Hvert datasæts indstillinger gemmes i et indstillingsobject under datasættets PimCore id nummer.

##### Eksempel:
    const datasetMeta = {
        2931: { ... },
        2934: { ... }
    }

indstillingobjectet indholder en række forskellige indstillinger, samt tekst som er nødvendig for at vise datasættet.

##### Eksempel:
    const datasetMeta = {
        2931: {
            RESTInfo: { ... },
            views: [ ... ],
            logos: [ ... ],
            dataInfo: { ... },
            tableSettings: { ... },
            dashboardSettings: { ... },
            mapSettings: { ... }
        }
    }

Nedenfor gennemgåes de forskellige indstillinger i detaljer.

#### RESTinfo
Object med to properties: (begge er nødvendige)
- **serviceName** er navnet på det endpoint som data hentes fra f.eks. 'ept' eller 'noegletal'
- **rootKey** bruges til at finde data-array i returneret JSON fra REST. For 'ept' er rootKey f.eks. 'selskaber'

##### Eksempel:
    RESTInfo: {
      serviceName: 'ept',
      rootKey: 'selskaber'
    }

#### views (Arr)
I views-array'et styres, hvilke visninger det enkelte datasæt indholder.

- **type** (Str) angiver typen af visning - App'en understøtter pt. 3 mulige visninger:
    - **'table'** viser data i tabelform, hvor hver række svarer til et item i data-arrayet. Indstillinger for tabelvisningen sættes i tablesettings (se nedenfor)
    - **'map'** viser data på et kort, hvor hvert punkt svarer til en række i data-arrayet. Indstillinger for kortvisningen sættes i tablesettings (se nedenfor)
    - **'dashboard'** viser et powerBi dashboard i en iFrame. Indstillinger for dette dashboard sættet i dashboardSettings (se nedenfor)
- **label** (Str) angiver det brugerrettede navn, som vises under 'visninger' på hvert datasæt på siden 'dataoversigt', samt på fanebladet på dataset-siden.

##### Eksempel:
    views: [
      { label: 'Tabel', type: 'table' },
      { label: 'Kort', type: 'map' }
    ]

#### logos (Arr))
Array med logo'er der skal vises på datasættets box - id'er på PimCore-assets. Har følgende properties:
- **label** (Str) Brugerrettet titel som vises ved mouse-over eller i screen readers.
- **logoId** (Str) Id på asset-filen i pimCore.

##### Eksempel:
    logos: [
      { label: 'Energistyrelsen', logoId: 873 }
    ]

#### dataInfo
Informationer om datasættet som bruges i visningen. Har følgende properties:
- **datasetDescription** vises som første paragraf under /data/:id/visning/databeskrivelse
- **sectors** bruges til at filtrere datasæt på datasæt-oversigten

##### Eksempel:
    dataInfo: {
      dataDescription: 'På denne side kan du finde beskrivelser af udvalgte økonomiske nøgletal. <br /><br /> ELNET: <br /> ...',
      sectors: ['Distribution af el', 'Drikkevand', 'Spildevand']
    }

#### tableSettings (Obj)
Tablesetting indeholder indstillinger for tabelvisningen af datasettet og inderholder følgende settings:

##### columnDef (Arr)
Hver kolonne i tabelvisningen er defineret som et object i columnDef array'et. Disse definitioner bruges også til at genere en liste over felter i datasættet under 'Databeskrivelse', samt leverer kolonnetitler og formatering til CSV download.
Hver kolonne-definition har følgende mulige properties:
- **type** (str, nødvendig) streng der angiver en felt/kolonne type med følgende muligheder: 
    - 'txt': textfeltet formateres ikke og venstrestilles i tabellen. 
    - 'num': nummerfeltet feltes værdi afrundes eventuelt og formatteres eventuelt med tusindtalsseperatorer. Kolonnen højrestilles.
    - 'dat': datofeltet formateres ikke men sorteres som dato og højrestilles i tabelvisning.
- **defaultwidth** (int, nødvendig) tal der angiver bredden af kolonnen i pixels
- **fieldId** (str, nødvendig) angiver navnet på feltet i det parsede data. (som det ser ud i store'n)
- **label** (str, nødvendig) det brugerrettede navn på feltet. Vises både i tabellens kolonne overskrift, samt under fanen 'databeskrivelse'
- **separator** (boolean, valgfri) hvis type er 'num' og denne er true indsættes tusindtalsseperatorer i data før det vises i tabellen.
- **decimals** (int, valgfri) hvis type er 'num' angives her antal decimaler der skal afrundes til. Udelades denne, afrundes ikke. (Vær iøvrigt opmærksom på udfordringer med at afrunde i javascript)
- **unit** (str, valgfri) mulighed for at angive en enhed (f.eks. 'DKK') der indsættes lige efter data i tabelvisningen. 
- **shortDef** (str, valgfri) kort beskrivelse af feltet, som vises ved klik på spørgsmålsikon i kolonneheader, samt under fanen 'databeskrivelse'.
- **longDef** (str, valgfri) lang beskrivelse af feltet som vises under fanen 'databeskrivelse'. HTML kan inkluderes.

##### Eksempel
    { type: 'num', decimals: 0, separator: true, fieldId: 'ikke_paavirkelige_omkostninger', unit: 'DKK', label: 'Ikke-påvirkelige omkostninger', defaultWidth: 220, shortDef: 'Ved ikke-påvirkelige omkostninger forstås...', longDef: '...' },

##### filterDef (Arr)
Filtrering af data i tabelvisningen er defineret som en liste af filtreringer, af typerne 'search', 'multiselect' eller 'columnFilter'. Tilføj et filter i filterDef-array'et og det vil automatisk blive tilføjet til tabelvisningen.

Hver filter-definition har følgende propterties:
- **type** (Str, nødvendig) angiver filtertypen og kan have en af tre værdier:
    - **'search'** tilføjer søgefelt som filtrerer i data baseret på søge ord. Søger automatisk i alle felter.
    - **'multiselect'** tilføjer dropdown med checkboxes. Filtrer på valgte værdier i den kolonne der er defineret i 'fieldId'.
    - **'columnFilter'** filtrerer ikke i data men viser eller skjuler hele kolonner.
- **label** (Str, valgfri) brugerrettet beskrivelse af filtrer, vises i label ovenover input eller dropdown.
- **name** (Str, nødvendig) det unikke navn på filtret som bruges internt i app'en
- **fieldId** (Str, nødvendig, kun ved multiselect) id på kolonnen som filtreres
- **options** (Str, valgfri, kun ved multiselect) værdier til dropdown, udelades disse befolkes options automatisk med alle unikke værdier i den valgte kolonne.
- **initValue** (Str, bruges kun ved type multiselect) array med en eller flere af de definerede muligheder i 'options' eller streng med værdien '_all' for automatisk at vælge alle

#### mapSettings
Indeholder indstillinger for kortvisning, hvis en sådan er tilføjet under 'views'.

##### mapConstants (Obj)
indeholder grundlæggende kortinfo om kortest størrelse, placering mv.

##### Eksempel:
    mapconstants : {
        center: [10.61010906, 56.15950977],
        extent: [120000, 5900000, 1000000, 6500000],
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2],
        matrixIds: ['L00', 'L01', 'L02', 'L03', 'L04', 'L05', 'L06', 'L07', 'L08', 'L09', 'L10', 'L11', 'L12', 'L13']
    }

##### clustering (boolean)
Angiver om eventuelle markers på kortet som default er grupperet.

##### visualizationDef (Obj)
Definerer de forskellige datavisualiseringer. Kortet rummer 3 mulige visualiseringstyper:
- **markers** visualiserer geometriske værdier i data som punkter på kortet. Definitionsobjectet rummer følgender properties:
    - **markerFieldId** Id på felt der kan bruges som unik id-streng for punkt-markøren.
    - **markerGeometryField** Id på felt der indeholde geografisk punkt.
    - **popup** hvis true, vises popup med data ved klik på markør.
    - **popupTitleFieldId** Id på det felt der skal bruges som titel for evt. popup
    - **secondLevelTitleFieldId** Id på felt der skal bruges som niveau 2 titel ved evt. hierarkisk datastruktur. (Dette er fx tilfældet i datasættet 'Energiproducenttælling' hvor hvert punkt på kortet reprææsenterer et 'værk' mens hvert værk indeholder en til flere 'anlæg')
    - **secondLevelHeader** Label for niveau 2.
- **markerIcon** visualiserer værdier i data iform af forskellige markør ikoner. 
- **dataFieldId** Id på feltet, hvis værdier mappes til markør ikon.
- **iconMap** mapning af feltværdier til ikon-url.
- **markerSize** visualiserer værider i data iform af markørikon-størrelse
- **dataFieldId** Id på fetlet, hvis værdier mappes til ikon-størrelse
- **sizeMap** mapning af feltværdier til ikon-størrelse.

##### filterDef (Arr)
Definerer en række filtre på samme facon som under tableSettings

#### dashboardSettings (Obj)
Indeholder indstillinger for kortvisning, hvis en sådan er tilføjet under 'views'.
Indholder pt. udelukkende url til PowerBi Dashboard som skal embeddes.


## Andet

### Feltformatering
funtionen 'formatField' i HelperFunctions.js bruges til at formattere data lige før visning.

### Filtrering
Filtrering foretages front-end. Filtre defineres for hvert datasæt i MetaData.js og selv filtreringen foretages i dataset.vue
Værd at bemærke:
- Hvis ingen options er angivet for filtret vil metoden setFilter gennemgå alle værdier i datasættet, lave en liste over unikke værdier for det givne felt og bruge dette som options.
- Hvis en option har værdien '' (tom streng) vil denne filtrering inkludere rækker hvor feltets værdi er undefined, null, 'null', eller ''
- Filtrering (inkl. søgning) ser på feltværdierne FØR formatering, dvs. at f.eks. tusindtalsseperator og kommaer (som tilføjes i feltformatteringen) ikke fremsøges som de vises i tabellen, men som de fremgår af data. 

## Ikoner
Ikoner ligger som svg'er pakket ind i vue-componenter i mappen icons og bruges i app'en via komponenten Icon.vue

## Styling
Farver defineres i colors.js og bruges derefter i app som 'var(--farveNavn)'
Farver er hentet fra Dataforsyningen.dk's Design guide, men dog er nogle farver tilpasset til webApp'ens temafarver. Dette er beskrevet i colors.js.
Dette er opbygget med det formål at gøre det let at ændre sidens farve-pallette, hvis man f.eks. ønsker at implementere Design Guiden 100%.
Base style-sheet er bygget ovenpå stylesheets fra Dataforsyningen
