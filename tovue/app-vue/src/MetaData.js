import IconLynRoed from './assets/mapIcons/lyn_roed.svg'
import IconCirkelLysegroen from './assets/mapIcons/cirkel_lysegroen.svg'
import IconCirkelSortKant from './assets/mapIcons/cirkel_sortkant.svg'
import IconKvadratBlaa from './assets/mapIcons/kvadrat_blaa.svg'
import IconPlusLysegroen from './assets/mapIcons/plus_lysegroen.svg'
import IconRuderLysegroen from './assets/mapIcons/ruder_lysegroen.svg'
import IconSekskantLysegroen from './assets/mapIcons/sekskant_lysegroen.svg'
import IconStjerneLysegroen from './assets/mapIcons/stjerne_lysegroen.svg'
import IconTrekantBlaa from './assets/mapIcons/trekant_blaa.svg'
import IconTrekantGraa from './assets/mapIcons/trekant_graa.svg'
import IconTrekantGul from './assets/mapIcons/trekant_gul.svg'
import IconDefault from './assets/mapIcons/cirkel_graa_spoergsmaal.svg'

export const datasetMeta = {
  2931: { // Økonomiske nøgletal
    RESTInfo: {
      serviceName: 'noegletal',
      rootKey: 'noegletal'
    },
    views: [
      { label: 'Tabel', type: 'table' },
      { label: 'Figurer og tal', type: 'dashboard' }
    ],
    logos: [
      { label: 'Forsyningstilsynet', link: '', logoId: 1735 },
      { label: 'Konkurrence- og Forbrugerstyrelsen', link: '', logoId: 1767 }
    ],
    dataInfo: {
      // eslint no-multi-str: "off"
      dataDescription: 'På denne side kan du finde beskrivelser af udvalgte økonomiske nøgletal for de af forsyningssektorens monopolselskaber, som er underlagt økonomisk regulering. Økonomisk regulering indebærer, at forsyningsselskaberne får fastsat årlige økonomiske rammer også kaldet indtægtsrammer. Det udstillede data indeholder udvalgt økonomisk data samt nøgletal for de økonomiske rammer, som kan give indblik i de elementer, der indgår i den økonomiske regulering af det pågældende forsyningsområde (f.eks. eldistribution og vand). <br /><br /> ELNET: <br /> For eldistribution tager de følgende beskrivelser udgangspunkt i bekendtgørelse nr. 969 af den 27. juni 2018 om indtægtsrammer for elnetvirksomheder, som ændret ved bekendtgørelse nr. 1366 af den 28. november 2018, der trådte i kraft den 1. december 2018 (herefter indtægtsrammebekendtgørelsen). Forsyningstilsynet (herefter FSTS) varetager den økonomiske regulering af elnetvirksomhederne. <br /><br /> VAND: <br /> For vand tager de følgende beskrivelser udgangspunkt i vandsektorloven (lovbekendtgørelse om vandsektorens organisering og økonomiske forhold, nr. 52 af 23. januar 2020) samt ØR-bekendtgørelsen (bekendtgørelse om økonomiske rammer for vandselskaber, nr. 2291 af 30. december 2020 med senere ændringer). Det er Forsyningssekretariatet (herefter FS), der fastsætter de årlige økonomiske rammer og håndhæver vandsektorloven samt ØR-bekendtgørelsen. Det skal for vandselskaberne bemærkes, at der kun udstilles økonomiske nøgletal for de forsyningsselskaber, som indgår i den økonomiske regulering.',
      sectors: ['Distribution af el', 'Drikkevand', 'Spildevand']
    },
    tableSettings: {
      columnDef: [
        { type: 'txt', fieldId: 'registreringsaktoer', label: 'Registreringsaktør', shortDef: 'Den aktør, der har foretaget registreringen.', longDef: '', defaultWidth: 220 },
        { type: 'txt', fieldId: 'sektor', label: 'Sektor', shortDef: 'Forsyningsområde som nøgletal er opgjort for.', longDef: '', defaultWidth: 120 },
        { type: 'txt', fieldId: 'aar', label: 'År', shortDef: 'Årstal, som data vedrører. Indberettet af selskabet.', longDef: '', defaultWidth: 100 },
        { type: 'txt', fieldId: 'cvrnummer', label: 'CVR', shortDef: 'CVR-nummer for selskabet. Indberettet af selskabet.', longDef: '', defaultWidth: 100 },
        { type: 'txt', fieldId: 'selskabsnavn', label: 'Selskab', shortDef: 'Selskabets navn. Indberettet af selskabet.', longDef: '', defaultWidth: 300 },
        { type: 'txt', fieldId: 'pnummer', label: 'P-nummer', shortDef: 'P-enhedens unikke ID. Indberettet af selskabet.', longDef: '', defaultWidth: 120 },
        { type: 'num', separator: true, fieldId: 'pris', label: 'Pris', unit: 'DKK', defaultWidth: 180, shortDef: 'Dette nøgletal angiver den estimerede pris per leveret forsyningsenhed. Nøgletallet angives i løbende priser givet ved året for den økonomiske ramme.', longDef: 'ELNET <br />Der findes ikke én pris, som en elnetvirksomhed er bundet til at opkræve. Elnetvirksomhedernes priser skal fastsættes, så de opfylder en række kriterier fastsat ved lov. De tilladte indtægter, som kan opkræves, er givet ved elnetvirksomhedernes indtægtsrammer. Ud fra deres tilladte indtægter (indtægtsrammen) fastsætter de deres nettariffer og netabonnementer (dvs. deres faktiske priser) ud fra godkendte tarifmetoder (pt. tarifmodel 2.0). <br /><br />Indtægtsrammen divideret med leveret mængde elektricitet kan anvendes som estimat for en gennemsnitlig pris, og dette estimatet er således prisen på at distribuere el målt i kWh. For elnetvirksomheder er nøgletallet opgjort ved at dividere indtægtsrammen med den leverede forsyningsmængde. <br /><br/>VAND<br />Der findes ikke én pris – også kaldet takst – for vand. Taksterne bestemmes ud fra kombinationen af anlægs-, forsyningslednings-, stiklednings- og driftsbidrag, og i hvilke situationer vandforsyningen er berettiget til at opkræve de forskellige bidrag. Hvert vandselskabs specifikke vandtakster fremgår af vandselskabets takstblad. Alle vandforsyningers takster godkendes af kommunen. Taksterne skal blandt andet fastsættes i overensstemmelse med vandforsyningslovens ”hvile-i-sig-selv”-princip, således at vandforsyningens indtægter over en årrække ikke overstiger dets omkostninger. Det er den økonomiske ramme, der udgør loftet for, hvor meget et vandselskab samlet set må opkræve hos dets forbrugere. <br /><br/>Nøgletallet for den estimerede pris – eller vandtakst – er baseret på indhentede oplysninger om hvert vandselskabs takstblade inkl. fast bidrag samt Danmarks Statistiks opgørelse af vandforbruget (m<sup>3</sup>/år) for en gennemsnitlig husstand (Der er i beregningerne anvendt et årligt vandforbrug for en gennemsnitlig husstand på 81 m<sup>3</sup> vand. Se prisdata opgjort på selskabs-, kommunalt og regionalt niveau på https://www.kfst.dk/vandtilsyn/analyser). Priserne er inkl. moms. Vandselskaberne indberetter ikke oplysninger om deres vandtakster til FS, hvorfor der for dette nøgletal kan være manglende observationer.' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'leveret_forsyningsmaengde', label: 'Leveret forsyningsmængde', defaultWidth: 200, shortDef: 'Dette nøgletal dækker over den leverede forsyningsmængde angivet i den for det pågældende forsyningsområdes relevante enhed. Indberettet af selskabet.', longDef: 'ELNET<br />For elnetvirksomheder angiver nøgletallet antal kWh leveret af elnetvirksomheden til slutbruger eller anden aftager, jf. § 2, nr. 11 i indtægtsrammebekendtgørelsen.<br /><br />VAND<br />For vand angiver nøgletallet den debiterede vandmængde målt i kubikmeter (m<sup>3</sup>) per år. Det indebærer det antal kubikmeter, som vandselskabet leverer, afleder, indvinder, transporterer, behandler mv. mod betaling per år, jf. ØR-bekendtgørelsens § 1, stk. 2.' },
        { type: 'txt', fieldId: 'enhed', label: 'Enhed', defaultWidth: 150, shortDef: 'Enhed for feltet "leveret forsyningsmængde"', longDef: '' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'oekonomiskramme', unit: 'DKK', label: 'Økonomisk ramme', defaultWidth: 150, shortDef: 'Økonomisk ramme er en fælles betegnelse for de etårige indtægtsrammer og regnskabsmæssige kontrolrammer, der fastsættes på hvert forsyningsområde. Nøgletallet angives i løbende priser givet ved året for den økonomiske ramme.', longDef: 'ELNET<br />En elnetvirksomheds økonomiske ramme, også kaldet indtægtsramme, udgør det højeste beløb, som netvirksomheden i et kalenderår kan oppebære ved indtægter fra drift af sin bevillingspligtige aktivitet. <br />For elnetvirksomheder består indtægtsrammen af summen af en omkostningsramme og en forrentningsramme, hvortil der foretages beløbsmæssige justeringer, herunder dækning af nettoomkostninger til energibesparende aktiviteter, jf. § 5 i indtægtsrammebekendtgørelsen.<br /><br/>FSTS træffer afgørelse om en elnetvirksomheds årlige indtægtsramme for reguleringsåret efter reglerne i §§ 5-7 i indtægtsrammebekendtgørelsen senest 6 måneder efter, at FSTS har modtaget elnetvirksomhedernes reguleringsregnskab for et reguleringsår, jf. § 4 i indtægtsrammebekendtgørelsen.<br/><br/>Bemærk, at i forbindelse med overgangen til ny økonomisk regulering pr. 1. januar 2018 gælder overgangsbestemmelser til brug for fastsættelse af indtægtsrammer i første reguleringsperiode.<br /><br />VAND<br />For vand består den økonomiske ramme af en omkostningsramme. Der fastsættes økonomiske rammer for vandselskaber omfattet af vandsektorlovens §§ 6 og 6 a. Forsyningssekretariatet fastsætter hvert år senest 15. oktober en indtægtsramme, jf. vandsektorlovens § 6, for vandselskaber med en årlig debiteret vandmængde over 800.000 m<sup>3</sup> (herefter større vandselskaber), og en regnskabsmæssig kontrolramme, jf. vandsektorlovens § 6a, for vandselskaber med en årlig debiteret vandmængde på højst 800.000 m<sup>3</sup> (herefter mindre vandselskaber). De økonomiske rammer fastsættes for alle kommunalt ejede drikke- og spildevandsselskaber samt de forbrugerejede vandværker, der leverer, behandler eller transporterer minimum 200.000 m<sup>3</sup> drikkevand om året til forbrugere og virksomheder.<br/><br/>Mindre vandselskaber får fastsat økonomiske rammer for en reguleringsperiode på fire år, mens de større vandselskaber i en overgangsperiode har reguleringsperioder på to år. Fra 2022/2023 vil de større vandselskabers reguleringsperioder også være fireårige. De større vandselskabers reguleringsperioder er forskudt afhængigt af, om der er tale om et drikke- eller spildevandsselskab. De større drikkevandsselskaber benchmarkes og får fastsat nye økonomiske rammer i lige år, mens det for de større spildevandsselskaberne sker i ulige år. <br/><br/>Bemærk, at de mindre, forbrugerejede vandselskaber fra den 1. januar 2020 har haft mulighed for at træde ud af den økonomiske regulering. Disse selskaber får dermed ikke længere fastsat økonomiske rammer, hvorfor information om disse selskabers økonomiske forhold ikke opdateres.' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'forrentningsramme', unit: 'DKK', label: 'Forrentningsramme', defaultWidth: 210, shortDef: 'Forrentningsrammen udgør forrentningen af et forsyningsselskabs historiske forrentningsgrundlag og fremadrettede forrentningsgrundlag med tilhørende forskellige forrentningssatser. Angives i løbende priser givet ved året for den økonomiske ramme.', longDef: 'ELNET<br/>Forrentningsrammen udgør forrentningen af en elnetvirksomheds historiske forrentningsgrundlag og fremadrettede forrentningsgrundlag fastsat efter § 7, stk. 2-11 i indtægtsrammebekendtgørelsen. Det historiske forrentningsgrundlag forrentes med den historiske forrentningssats, som udgør den mindste af den lange obligationsrente plus 1 procentpoint og elnetvirksomhedens gennemsnitlige mulige forrentningssats efter indtægtsrammen i årene 2012-2014 beregnet efter metoden i bilag 4, jf. § 39 i indtægtsrammebekendtgørelsen. Det fremadrettede forrentningsgrundlag fastsættes i medfør af bekendtgørelse om forrentningssats for elnetvirksomheders fremadrettede forrentningsgrundlag, jf. § 40 i indtægtsrammebekendtgørelsen. <br/><br/>Bemærk, at der for elnetvirksomheder er tale om en anderledes måde at fastsætte forrentningsrammen på i første reguleringsperiode efter overgang til ny regulering pr. 1. januar 2018, jf. § 57 i indtægtsrammebekendtgørelsen.<br/><br/>VAND<br/><br/>Den økonomiske regulering indebærer på nuværende tidspunkt (2020) ikke forrentningsrammer. På sigt vil der dog blive indarbejdet forrentningsrammer som en del af de økonomiske rammer.' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'omkostningsramme', unit: 'DKK', label: 'Omkostningsramme', defaultWidth: 210, shortDef: 'Omkostningsrammen er fastsat med udgangspunkt i forsyningsselskabets gennemsnitlige omkostninger. Nøgletallet angives i løbende priser givet ved året for den økonomiske ramme.', longDef: 'ELNET<br/><br/>Omkostningsrammen er fastsat med udgangspunkt i elnetvirksomhedernes gennemsnitlige omkostninger i foregående reguleringsperiode. <br/>De enkelte års omkostninger justeres inden gennemsnitsberegningen for forskellige tiltag, jf. § 6, stk. 1 i indtægtsrammebekendtgørelsen. <br/>Dernæst justeres gennemsnitsberegningen for indeværende reguleringsperiode til og med reguleringsåret for ændring i aktivitetsniveau og pristalsudvikling samt justeres som følge af afgørelser, som FSTS har truffet på baggrund af forhold omfattet af §§ 24-33, jf. § 6, stk. 2. Justeringer foretaget efter §§ 24-33 fremgår af nøgletallet tillæg.<br/>Omkostningsrammen nedsættes, hvis netvirksomheden er identificeret som vedvarende ineffektiv, jf. § 6, stk. 3.  <br/><br/>Bemærk, at i forbindelse med overgang til ny økonomisk regulering pr. 1. januar 2018 fastsættes omkostningsrammen i første reguleringsperiode efter § 54 i indtægtsrammebekendtgørelsen. <br/><br/>VAND<br/>Omkostningsgrundlaget for omkostningsrammen er fastsat med udgangspunkt i vandselskabets indberettede faktiske driftsomkostninger i 2013-2015 suppleret med oplysninger fra de tidligere fastsatte prislofter eller indtægtsrammer. Omkostningsgrundlaget indeholder desuden anlægsomkostninger i form af historiske investeringstillæg og tillæg til for gennemførte investeringer i perioden 2010-2015. Omkostningsgrundlaget justeres hvert år for en række forskellige tiltag, jf. metoderne beskrevet ved ØR-bekendtgørelsens §§ 9-16 og 18. Det indebærer, at der stilles krav om effektivisering, at omkostningsgrundlaget justeres med en pristalsregulering og produktivitetsudvikling, at omkostningsrammen eventuelt forøges med tillæg samt at der foretages kontrol med, om selskabet har overholdt den økonomiske ramme. <br/><br/>Bemærk, at der ikke findes et samlet nøgletal for korrektioner som følge af pristalsregulering, produktivitetsudvikling og kontrol, da disse både fastsættes på baggrund af den årlige udvikling og individuelle selskabsspecifikke forhold. Differencen – mellem på den ene side omkostningsrammen og på den anden side summen af de påvirkelige- og ikke-påvirkelige omkostninger inkl. tillæg fratrukket den nominelle værdi af det generelle og det individuelle effektiviseringskrav – kan betragtes som summen af de årlige korrektioner og den årlige kontrol.' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'tillaeg', unit: 'DKK', label: 'Tillæg', defaultWidth: 150, shortDef: 'Dette nøgletal dækker over tillæg til omkostningsrammen, som selskaberne kan ansøge om. Angives i løbende priser givet ved året for den økonomiske ramme.', longDef: 'ELNET<br/><br/>FSTS kan efter ansøgning fra netvirksomhederne justere en netvirksomheds omkostningsramme og forrentningsramme for forhold omfattet af §§ 24-33 i indtægtsrammebekendtgørelsen. Disse forhold omfatter blandt andet kabellægning af luftledninger og udskiftning og opgradering af elmålere til fjernaflæste målere.<br/>Nøgletallet tillæg omfatter ligeledes tillæg og fradrag givet i forbindelse med historiske afgørelser, som indgår i omkostningsrammen i reguleringsåret. <br/><br/>Bemærk, at nøgletallet tillæg kun angiver tillæg og fradrag til omkostningsrammen ikke forrentningsrammen. <br/><br/>VAND<br/>Et vandselskabs økonomiske ramme kan øges med et tillæg, der udgør vandselskabets samlede afholdte omkostninger til de tillægstyper, som fremgår af ØR-bekendtgørelsens §§ 11 og 33. Enkelte tillægstyper skal opfylde, at der er tale om meromkostninger til statsligt eller kommunalt fastsatte, pålagte eller godkendte mål, såfremt disse omkostninger overstiger enten 1 pct. af den fastsatte økonomiske ramme for det pågældende år eller 500.000 kr. inden for et kalenderår, jf. ØR-bekendtgørelsens § 11, stk. 1. I tilfælde af at et vandselskabs omkostninger, som har udløst et tillæg til den økonomiske ramme, nedsættes eller bortfalder, reduceres den økonomiske ramme tilsvarende. <br/><br/> Bemærk, at tillæg kun fremgår i det år, hvor tillægget gives første gang, eller hvor tillægget nedsættes eller bortfalder.' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'generelt_effektivitetskrav', unit: 'DKK', label: 'Generelt effektiviseringskrav (DKK)', defaultWidth: 220, shortDef: 'Dette nøgletal dækker over et generelt effektiviseringskrav. Det generelle effektiviseringskrav har til formål at afspejle produktivitetsudviklingen i sektoren og stilles til alle selskaber, der indgår i den økonomiske regulering. Angives i løbende priser givet ved året for den økonomiske rammer og i pct. ', longDef: 'ELNET<br />Det generelle effektiviseringskrav beregnes årligt af FSTS på baggrund af produktivitetsudviklingen i relevante sektorer i Danmark, jf. § 9 i indtægtsrammebekendtgørelsen. FSTS beregner produktivitetsudvikling som et gennemsnit i de foregående 5 års observationer af udviklingen i arbejdsproduktiviteten i bygge- og anlægssektoren, som indgår med 70 pct., og udviklingen i arbejdsproduktiviteten i den markedsmæssige økonomi, som indgår med 30 pct., jf. § 9, stk. 2 i indtægtsrammebekendtgørelsen. <br/><br/>For elnetvirksomheder er det udmøntede effektiviseringskrav i 2018 lig med summen af det generelle og det individuelle effektiviseringskrav. <br/>For 2019 og frem benyttes det maksimale af det generelle og det individuelle effektiviseringskrav. Bemærk, at det udmøntede effektiviseringskrav er lig med et akkumuleret krav over årene i hver reguleringsperiode.<br/><br/>VAND<br/>For de større vandselskaber korrigeres den påvirkelige del af den økonomiske ramme med et generelt effektiviseringskrav, jf. vandsektorlovens § 6, stk. 3. Det samlede procentvise generelle effektiviseringskrav afviger på tværs af de større vandselskaber, da kravets størrelse er betinget af størrelsen på selskabets drifts- og anlægsomkostninger.<br/>For de mindre vandselskaber korrigeres den økonomiske ramme efter vandsektorlovens § 6 a, stk. 3, med et generelt effektiviseringskrav, som udgør 1,7 pct. af de samlede drifts- og anlægsomkostninger, der indgår i det enkelte vandselskabs økonomiske ramme, jf. dog ØR-bekendtgørelsens § 9, stk. 4. ' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'individuelt_effektivitetskrav', unit: 'DKK', label: 'Individuelt effektiviseringskrav (DKK)', defaultWidth: 220, shortDef: 'Dette nøgletal dækker over et individuelt effektiviseringskrav, der stilles til den påvirkelige del af den økonomiske ramme. Det individuelle effektiviseringskrav fastsættes vha. benchmarking. Angives både i løbende priser givet ved året for den økonomiske rammer og i pct. ', longDef: 'ELNET<br/>Det individuelle effektiviseringskrav beregnes årligt af FSTS ved benchmarking af elnetvirksomhedernes økonomiske effektivitet, jf. § 10 i indtægtsrammebekendtgørelsen. Metoden til fastsættelse af individuelle effektiviseringskrav er udarbejdet af FSTS og bygger på fagligt anerkendte metoder. Udvalgt data kan ikke indgå i benchmarkingen, jf. § 10 stk. 3 i indtægtsrammebekendtgørelsen. Der foretages et passende forsigtighedshensyn, der afspejler usikkerheden i estimatet for effektiviseringspotentialet, jf. § 11, stk. 3 i indtægtsrammebekendtgørelsen.<br/><br/>Bemærk, at det individuelle effektiviseringskrav beregnes som 0,4 pct. af omkostningsrammen i 2018 i forbindelse med overgang til ny regulering, jf. § 52, stk. 2 i indtægtsrammebekendtgørelsen.<br/><br/>For elnetvirksomheder er det udmøntede effektiviseringskrav i 2018 lig med summen af det generelle og det individuelle effektiviseringskrav. <br/>For 2019 og frem benyttes det maksimale af det generelle og det individuelle effektiviseringskrav. Bemærk, at det udmøntede effektiviseringskrav er lig med et akkumuleret krav over årene i hver reguleringsperiode.<br/><br/>VAND<br/>Der foretages totaløkonomisk benchmarking af vandselskaber med en årlig debiteret vandmængde over 800.000 m<sup>3</sup>, jf. vandsektorlovens § 4, stk. 1, samt af vandselskaber, der frivilligt deltager i den totaløkonomiske benchmarking, jf. vandsektorlovens § 4, stk. 3. For vandselskaber, der vurderes som ineffektive på grundlag af den totaløkonomiske benchmarking, jf. vandsektorlovens § 4, korrigeres indtægtsrammen med et individuelt effektiviseringskrav, der årligt kan udgøre op til 2 pct. af indtægtsrammen, jf. vandsektorlovens § 6, stk. 5. <br/><br/>Bemærk, at feltet for det individuelle effektiviseringskrav er blankt for de mindre vandselskaber, som er underlagt den økonomiske regulering, da de ikke bliver benchmarket. De mindre vandselskaber får kun stillet et generelt effektiviseringskrav.' },
        { type: 'num', decimals: 5, separator: true, fieldId: 'generelt_effektivitetskrav_procent', label: 'Generelt effektiviseringskrav', defaultWidth: 220, shortDef: 'Nøgletal angivet som decimaltal.', longDef: 'Se Generelt effektiviseringskrav (DKK)' },
        { type: 'num', decimals: 5, separator: true, fieldId: 'individuelt_effektivitetskrav_procent', label: 'Individuelt effektiviseringskrav', defaultWidth: 220, shortDef: 'Nøgletal angivet som decimaltal.', longDef: 'Se Individuelt effektiviseringskrav (DKK)' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'utilstraekkelig_leveringskvalitet', label: 'Utilstrækkelig leveringskvalitet', defaultWidth: 220, shortDef: 'Dette nøgletal dækker over 1-årige fradrag for utilstrækkelig leveringskvalitet. Angives i løbende priser givet ved året for den økonomiske ramme. Bemærk, at dette nøgletal kun findes for elnetvirksomheder.', longDef: 'ELNET<br/>Ved fastsættelse af en netvirksomheds indtægtsramme foretages 1-årige fradrag for utilstrækkelig leveringskvalitet, hvis netvirksomheden i et reguleringsår ikke overholder et eller flere mål fastsat af FSTS, jf. §§ 16-17 i indtægtsrammebekendtgørelsen. FSTS fastsætter og offentliggør i året forud for en påbegyndelse af en reguleringsperiode mål for elnetvirksomhedernes leveringskvalitet i form af mål for afbrudshyppighed og afbrudsvarighed på aggregeret niveau og i forhold til den enkelte elforbruger inden for nærmere definerede målkategorier, jf. tabel 1 i bilag 3 i indtægtsrammebekendtgørelsen.' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'paavirkelige_omkostninger', unit: 'DKK', label: 'Påvirkelige omkostninger', defaultWidth: 200, shortDef: 'Ved påvirkelige omkostninger forstås de omkostninger, der stilles årlige effektiviseringskrav til. Der stilles krav til disse omkostninger, da forsyningsselskaber per definition har mulighed for at påvirke niveauet af disse omkostninger. De påvirkelige omkostninger dækker både drifts- og anlægsomkostninger/afskrivninger herunder også finansielle omkostninger. Angives i løbende priser givet ved året for den økonomiske ramme. ', longDef: 'ELNET<br/><br/>De påvirkelige omkostninger er den del af en elnetvirksomheds samlede omkostninger, der stilles individuelle effektiviseringskrav til ved benchmarking, dvs. påvirkelige driftsomkostninger, afskrivninger og kapitalbindingsomkostninger. Metoden for benchmarkingen til fastsættelse af individuelle effektiviseringskrav skal sikre, at de anvendte benchmarkingydelser i vidt omfang beskriver elnetvirksomhedens omkostninger, og at der tages passende hensyn til individuelle, dokumenterede og fordyrende rammevilkår, jf. § 10, stk. 2 i indtægtsrammebekendtgørelsen.<br/><br/>VAND<br/>De påvirkelige omkostninger i et vandselskabs økonomiske ramme er den del af selskabets omkostninger, der stilles effektiviseringskrav til. På vandområdet blev der i forbindelse med indførslen af økonomiske rammer i 2017 for hvert vandselskab fastsat et omkostningsgrundlag, som er blevet videreført i de efterfølgende økonomiske rammer, og som de økonomiske rammer fortsat korrigeres på baggrund af. De videreførte omkostninger i de økonomiske rammer bliver hvert år korrigeret som følge af effektiviseringskrav, pristalsregulering, produktivitetsudvikling, eventuelle tillæg samt kontrol med overholdelse af den økonomiske ramme. <br/><br/>Bemærk, at nøgletallet for de påvirkelige omkostninger ikke svarer til vandselskabernes faktiske påvirkelige drifts- og anlægsomkostninger fra årsregnskabet, men derimod de videreførte omkostninger. Det vil sige, at vandselskaberne i realiteten kan have faktiske årlige påvirkelige omkostninger, der enten er højere eller lavere end det påvirkelige omkostningsniveau, som indgår i den økonomiske ramme. ' },
        { type: 'num', decimals: 0, separator: true, fieldId: 'ikke_paavirkelige_omkostninger', unit: 'DKK', label: 'Ikke-påvirkelige omkostninger', defaultWidth: 220, shortDef: 'Ved ikke-påvirkelige omkostninger forstås i modsætning til de påvirkelige omkostninger de omkostninger, der ikke stilles årlige effektiviseringskrav til, da det antages, at forsyningsselskaberne ikke har mulighed for at effektivisere disse omkostninger. Angives i løbende priser givet ved året for den økonomiske ramme.', longDef: 'ELNET<br/>De ikke-påvirkelige omkostninger består af omkostninger der ikke kan indgå i benchmarkingen, jf. § 10, stk. 3 i indtægtsrammebekendtgørelsen. Det omfatter nettoomkostninger til energisparesatsen, omkostninger til forsknings-, udviklings- og demonstrationsprojekter, hvor der er offentlig medfinansiering, omkostninger til myndighedsbehandling, samt anden data, som FSTS vælger ikke skal indgå i benchmarking, jf. § 10, stk. 3, nr. 1-4 i indtægtsrammebekendtgørelsen. <br/><br/>VAND<br/>De ikke-påvirkelige omkostninger, som der ikke stilles individuelle og generelle effektiviseringskrav til, svarer til summen af vandselskabers omkostninger til: <br/><ul><li>Akkumuleret restskat</li><li>Afgift til Forsyningssekretariatet</li><li>Køb af produkter og ydelser fra andre vandselskaber reguleret af vandsektorloven</li><li>Skatter og afgifter</li><li>Godtgørelse modtaget for skattemæssig overførsel af underskud til et andet vandselskab i samme koncern (sambeskatning)</li><li>Tjenestemandspensioner</li><li>Erstatninger</li><li>Beløb, som vandselskaber er blevet pålagt at betale i medfør af vandsektorlovens § 13 d, stk. 1, 2. pkt.</li><li>Vandselskabets betaling til ejeren af eller indehaveren af andre rettigheder over en ejendom for restriktioner i arealanvendelsen</li><li>Bidrag til vandsamarbejder</li><li>Betaling til projektejers medfinansieringsprojekter</li><li>Force majeure</li><li>Undersøgelsesudgifter i forbindelse med fusion og </li><li>Tillæg efter ØR-bekendtgørelsen § 11, stk. 10 (tilbagebetaling af vejbidrag).</li>  Dette fremgår af ØR-bekendtgørelsens §§ 9, stk. 4 og 5.</ul>' },
        { type: 'txt', fieldId: 'selskabsfusion', label: 'Selskabsfusion', defaultWidth: 175, shortDef: 'Selskabsfusion angiver ved de impliceredes CVR-numre, om selskabet i det pågældende år er fusioneret med et eller flere andre selskaber. Indberettet af selskabet.', longDef: 'Hvis selskabet er fusioneret eller er oprettet ved en fusion i det pågældende år, angives en kommasepareret liste af CVR-numre for de selskaber, der indgik i fusionen. Bemærk, at dette kun markeres for året, hvor fusionen finder sted. Det er det nye CVR-nummer, der fremadrettet indeholder information om det fusionerede selskabs økonomiske nøgletal.' },
        { type: 'txt', fieldId: 'selskabsspaltning', label: 'Selskabsspaltning', defaultWidth: 200, shortDef: 'Selskabsspaltning angiver ved de impliceredes CVR-numre, om selskabet i det pågældende år er spaltet til et eller flere selskaber. Indberettet af selskabet.', longDef: 'Hvis selskabet er oprettet ved spaltning af et andet selskab i det pågældende år, angives CVR-nummer på det oprindelige selskab. Bemærk, at dette kun markeres for året, hvor spaltningen finder sted. Det er de nye CVR-numre, der fremadrettet indeholder information om de spaltede selskabers økonomiske nøgletal.' }
      ],
      filterDef: [
        {
          label: 'Filtrer på søgeord',
          name: 'search',
          type: 'search',
          fieldId: '',
          initValue: ''
        },
        {
          label: 'Filtrer på år',
          name: 'aar',
          type: 'multiselect',
          fieldId: 'aar',
          initValue: '_all'
        },
        {
          label: 'Filtrer på sektor',
          name: 'sectors',
          type: 'multiselect',
          options: ['Distribution af el', 'Drikkevand', 'Spildevand'],
          fieldId: 'sektor',
          initValue: '_all'
        },
        {
          label: 'Vis/skjul kolonner',
          name: 'columnFilter',
          type: 'columnFilter',
          fieldId: '',
          initValue: ''
        }
      ]
    },
    dashboardSettings: {
      powerBiUrl: 'https://app.powerbi.com/view?r=eyJrIjoiNDRhZWFiNWQtODU5NC00YzVmLTlmOTYtOGQ1MjY4MDcyMDIyIiwidCI6IjIyMWM4ZmFlLTJmZjgtNGMxZC05N2ZhLTFkYzBhM2ZkYWNlYiIsImMiOjh9'
    }
  },
  2934: { // Energiproducent tælling
    RESTInfo: {
      serviceName: 'ept',
      rootKey: 'selskaber'
    },
    views: [
      { label: 'Tabel', type: 'table' },
      { label: 'Kort', type: 'map' }
    ],
    logos: [
      { label: 'Energistyrelsen', link: '', logoId: 1733 }
    ],
    dataInfo: {
      dataDescription: 'På denne side kan du finde beskrivelser af data om el- og/eller varmeproducerende enheder, der leverer til offentligt net i Danmark, med undtagelse af elproduktion fra solceller og vindkraft.',
      sectors: ['Produktion af el', 'Varme']
    },
    tableSettings: {
      columnDef: [
        { type: 'txt', fieldId: 'anlaeg_aar', label: 'År', shortDef: 'Årstal, som data vedrører.', longDef: '', defaultWidth: 80 },
        { type: 'txt', fieldId: 'selskab_cvrnummer', label: 'CVR', shortDef: 'CVR-nummer for selskabet', longDef: '', defaultWidth: 110 },
        { type: 'txt', fieldId: 'selskab_navn', label: 'Selskab', shortDef: 'Selskabets navn.', longDef: '', defaultWidth: 300 },
        { type: 'txt', fieldId: 'vaerk_navn', label: 'Værk', shortDef: 'Værkets navn', longDef: '', defaultWidth: 300 },
        { type: 'txt', fieldId: 'vaerk_adresse', label: 'Adresse', shortDef: 'Værkets adresse (vejnavn og husnummer).', longDef: '', defaultWidth: 200 },
        { type: 'num', fieldId: 'vaerk_postnummer', label: 'Postnummer', shortDef: 'Værkets postnummer.', longDef: '', defaultWidth: 150 },
        { type: 'txt', fieldId: 'vaerk_postnummernavn', label: 'By', shortDef: 'Værkets postdistrikt.', longDef: '', defaultWidth: 100 },
        { type: 'num', fieldId: 'vaerk_kommunekode', label: 'Kommunekode', shortDef: 'Værkets kommune.', longDef: '', defaultWidth: 160 },
        { type: 'txt', fieldId: 'vaerk_branchekode', label: 'Branchekode', shortDef: 'Branchekode (DB07) for værk som angivet i VIRK.', longDef: 'Branchekoden angiver, hvor ressourcen til energiproduktionen kommer fra. Der kan fx være varme fra en fremstillingsproces og branchekoden vil så angive fremstillingsprocessen.', defaultWidth: 160 },
        { type: 'txt', fieldId: 'vaerk_pnummer', label: 'P-nummer', shortDef: 'P-enhedens unikke ID.', longDef: '', defaultWidth: 150 },
        { type: 'txt', fieldId: 'vaerk_vaerktype', label: 'Værktype', shortDef: 'Værkets type.', longDef: '', defaultWidth: 150 },
        { type: 'txt', fieldId: 'vaerk_hovedbraendselsgruppe', label: 'Hovedbrændselsgruppe, værk', shortDef: 'Det hovedbrændsel, som har den største andel af det samlede brændselsforbrug på værksniveau i det pågældende år.', longDef: '', defaultWidth: 280 },
        { type: 'num', fieldId: 'vaerk_fjernvarmenetid', label: 'Fjernvarmenet ID', shortDef: 'Unikt ID for det fjernvarmenet, som varmeproduktionen leveres til.', longDef: '', defaultWidth: 200 },
        { type: 'txt', fieldId: 'vaerk_fjernvarmenetnavn', label: 'Fjernvarmenet navn', shortDef: 'Navn på fjernvarmenet.', longDef: '', defaultWidth: 280 },
        { type: 'txt', fieldId: 'anlaeg_navn', label: 'Anlæg', shortDef: 'Anlæggets navn.', longDef: '', defaultWidth: 250 },
        { type: 'txt', fieldId: 'anlaeg_anlaegstype', label: 'Anlægstype', shortDef: 'Anlæggets type.', longDef: '', defaultWidth: 150 },
        { type: 'txt', fieldId: 'anlaeg_aktoer', label: 'Aktør', shortDef: 'Beskriver om anlægget producerer el, varme eller begge dele, samt om anlæggets primære sektor er konverteringssektoren eller ej.', longDef: 'Energiproducenttællingen indeholder disse typer af aktører: Centrale elproducerende anlæg (cel), centrale kraftvarmeanlæg (cev), fjernvarmeanlæg (fvv), decentrale kraftvarmeanlæg (kvt), sekundære elproducenter (pel), sekundære kraftvarmeproducenter (pev), sekundære fjernvarmeproducenter (pvp), vandkraftanlæg (vkt), anden type aktør (and). Definitionerne følger Energistatistikkens inddeling.', defaultWidth: 150 },
        { type: 'dat', fieldId: 'anlaeg_idriftsaettelsesdato', label: 'Idriftsættelsesdato', shortDef: 'Dato for anlæggets idriftsættelse.', longDef: '', defaultWidth: 215 },
        { type: 'dat', fieldId: 'anlaeg_skrotningsdato', label: 'Skrotningsdato', shortDef: 'Dato for anlæggets skrotning. Hvis der ikke er angivet en dato, er anlægget i drift.', longDef: '', defaultWidth: 180 },
        { type: 'num', decimals: 2, separator: true, fieldId: 'anlaeg_elkapacitet', label: 'Elkapacitet', shortDef: 'Anlæggets elproduktionskapacitet (MW).', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_varmekapacitet', label: 'Varmekapacitet', shortDef: 'Anlæggets varmeproduktionskapacitet (MW).', longDef: '', defaultWidth: 180 },
        { type: 'txt', fieldId: 'anlaeg_hovedbraendsel', label: 'Hovedbrændsel, anlæg', shortDef: 'Det brændsel, som udgør den største andel af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 250 },
        { type: 'txt', fieldId: 'anlaeg_hovedbraendselsgruppe', label: 'Hovedbrændselsgruppe, anlæg', shortDef: 'Type af hovedbrændsel.', longDef: '', defaultWidth: 300 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_affald', label: 'Affald', shortDef: 'Andel, som forbrug af brændselsgruppen Affald udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_bio_olie', label: 'Bio-olie', shortDef: 'Andel, som forbrug af brændselsgruppen Bio-olie udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_biogas', label: 'Biogas', shortDef: 'Andel, som forbrug af brændselsgruppen Biogas udgør af anlæggets samlede brændselsforbrug', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_braendselsfrit', label: 'Brændselsfrit', shortDef: 'Andel, som forbrug af brændselsgruppen Brændselsfrit udgør af anlæggets samlede brændselsforbrug. ”Brændselsfri” omfatter input af overskudsvarme, geotermi og en lille import af fjernvarme fra Tyskland (Padborg Fjernvarme).', longDef: '', defaultWidth: 180 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_elektricitet', label: 'Elektricitet', shortDef: 'Andel, som forbrug af brændselsgruppen Elektricitet udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_fastbiomasse', label: 'Fast biomasse', shortDef: 'Andel, som forbrug af brændselsgruppen Fast biomasse udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_kul', label: 'Kul', shortDef: 'Andel, som forbrug af brændselsgruppen Kul udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_naturgas', label: 'Naturgas', shortDef: 'Andel, som forbrug af brændselsgruppen Naturgas udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_olie', label: 'Olie', shortDef: 'Andel, som forbrug af brændselsgruppen Olie udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_solenergi', label: 'Solenergi', shortDef: 'Andel, som forbrug af brændselsgruppen Solenergi udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 },
        { type: 'num', decimals: 2, fieldId: 'anlaeg_andel_vandkraft', label: 'Vandkraft', shortDef: 'Andel, som forbrug af brændselsgruppen Vandkraft udgør af anlæggets samlede brændselsforbrug.', longDef: '', defaultWidth: 150 }
      ],
      filterDef: [
        {
          label: 'Filtrer på søgeord',
          name: 'search',
          type: 'search',
          fieldId: '',
          initValue: ''
        },
        {
          label: 'År',
          name: 'anlaeg_aar',
          type: 'multiselect',
          options: ['2021', '2020', '2019', '2018'],
          fieldId: 'anlaeg_aar',
          initValue: '_all'
        },
        {
          label: 'Branche',
          name: 'branche',
          type: 'multiselect',
          options: ['351100 (Produktion af elektricitet)', '353000 (Varmeforsyning)', 'Anden branchekode'],
          fieldId: 'branche',
          initValue: '_all'
        },
        {
          label: 'Vis/skjul kolonner',
          name: 'columnFilter',
          type: 'columnFilter',
          fieldId: '',
          initValue: ''
        }
      ]
    },
    mapSettings: {
      mapConstants: {
        center: [10.61010906, 56.15950977],
        extent: [120000, 5900000, 1000000, 6500000],
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2],
        matrixIds: ['L00', 'L01', 'L02', 'L03', 'L04', 'L05', 'L06', 'L07', 'L08', 'L09', 'L10', 'L11', 'L12', 'L13']
      },
      clustering: true,
      visualizationDef: {
        markers: {
          markerIdField: 'vaerk_lokalid',
          markerGeometryField: 'vaerk_geometri',
          popup: true,
          popupTitleFieldId: 'vaerk_navn',
          secondLevelTitleFieldId: 'anlaeg_navn',
          secondLevelHeader: 'Anlæg'
        },
        markerIcon: {
          dataFieldId: 'vaerk_hovedbraendselsgruppe',
          iconMap: {
            Olie: IconTrekantBlaa,
            Brændselsfrit: IconCirkelSortKant,
            'Fast biomasse': IconSekskantLysegroen,
            Elektricitet: IconLynRoed,
            Naturgas: IconTrekantGul,
            Solenergi: IconStjerneLysegroen,
            Affald: IconKvadratBlaa,
            Kul: IconTrekantGraa,
            Biogas: IconRuderLysegroen,
            'Bio-olie': IconPlusLysegroen,
            Vandkraft: IconCirkelLysegroen,
            default: IconDefault
          }
        },
        markerSize: {
          dataFieldId: 'vaerk_vaerkstoerrelse',
          sizeMap: {
            1: 0.85,
            2: 0.7,
            3: 0.5
          }
        }
      },
      filterDef: [
        {
          label: 'Filtrer på søgeord',
          name: 'search',
          type: 'search',
          fieldId: '',
          initValue: ''
        },
        {
          label: 'År',
          name: 'vaerk_aar',
          type: 'multiselect',
          options: ['2018'],
          fieldId: 'vaerk_aar',
          initValue: '_all'
        },
        {
          label: 'Branche',
          name: 'branche',
          type: 'multiselect',
          options: ['351100 (Produktion af elektricitet)', '353000 (Varmeforsyning)', 'Anden branchekode'],
          fieldId: 'branche',
          initValue: '_all'
        },
        {
          label: 'Hovedbrændselsgruppe',
          name: 'vaerk_hovedbraendselsgruppe',
          type: 'multiselect',
          // options: ['Olie', 'Brændselsfrit', 'Fast biomasse', 'Elektricitet', 'Naturgas', 'Solenergi', 'Affald', 'Kul', 'Biogas', 'Bio-olie', 'Vandkraft', ''],
          options: [],
          fieldId: 'vaerk_hovedbraendselsgruppe',
          initValue: '_all'
        }
      ]
    }
  }
}
export const pageMeta = {
  forside: {
    title: 'Transformer koordinater',
    summary: 'Styrelsen for Dataforsyning og Effektivisering præsenterer en samlet indgang til koordinattransformationer.',
    coverId: 1713,
  },
  datasets: {
    title: 'Oversigt over datasæt',
    summary: 'Du kan her finde en oversigt over datasæt. Udforsk data med de forskellige muligheder for download, visualisering og filtrering. Der er kun få datasæt lige nu, men vi arbejder på at tilføje flere datasæt i fremtiden.',
    coverId: 1725
  },
  about: {
    title: 'Oversigt over datasæt',
    summary: '',
    coverId: 1719,
    htmlText: 'Koordinattransformation er et værktøj lavet af Styrelsen for Dataforsyning og Effektivisering. <br />'
  },
  support: {
    title: 'Oversigt over datasæt',
    summary: 'Du kan her finde en oversigt over datasæt. Lige nu kan du finde to datasæt, men vi arbejder på at tilføje flere datasæt i fremtiden.',
    coverId: 1717
  }
}
