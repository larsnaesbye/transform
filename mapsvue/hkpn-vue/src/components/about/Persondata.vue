<template>
  <div class="page-wrapper">
    <Header icon="PrivacyIcon" :header="header" :subheader="subheader" :version="version" :updated="updated"/>
    <div class="row row__one">
      <div class="left-col">
        <Menu/>
        <div class="content text-small">
          <p :style="{color : this.$themeColors.darkTurquoise }">Styrelsen for Dataforsyning og Effektivisering varetager myndighedsopgaver, hvor styrelsen behandler personoplysninger på egne og andres vegne, og styrelsen er derfor både dataansvarlig og databehandler. Ved personoplysninger forstås informationer vedr. en identificeret eller identificerbar fysisk person. Ved behandlinger forstås fx indsamlinger, opbevaring, brug mv. På denne side finder du oplysninger om, til hvilke formål SDFE behandler forskellige personoplysninger på Historiske Kort.</p>
          <p :style="{color : this.$themeColors.darkTurquoise }">SDFE’s grundregistreringer af geodata som adresse- og kortmyndighed falder imidlertid kun ind under begrebet personoplysninger, når styrelsen håndterer data på en sådan måde, at de indholdsmæssigt relaterer sig til en identificerbar fysisk person, umiddelbart har konsekvenser for eller mere specifikt påvirker forhold af betydning for personen, særligt hvad angår dennes status, handlemuligheder, rettigheder og forpligtelser.</p>
        </div>
        <div class="content text-small" :style="{'border-top' : '1px solid '+this.$themeColors.lightGrey}">
          <h3>Rettigheder som registreret</h3>
          <p>Hvis SDFE har registreret personoplysninger om dig, anses du for at være ”registreret”, og du har nogle grundlæggende rettigheder.</p>
          <p>Du kan i det følgende læse, hvilke rettigheder der kan være relevante for dig, hvis du er registreret.</p>
          <h3>Ret til indsigt</h3>
          <p>Du har ret til at få at vide, om SDFE behandler dine personoplysninger. Ligeledes har du ret til at se de personoplysninger, SDFE behandler om dig og få en række oplysninger om behandlingen.</p>
          <h3>Ret til berigtigelse</h3>
          <p>Viser det sig, at SDFE opbevarer mangelfulde eller fejlagtige oplysninger, har du ret til at bede om at få rettet eller tilføjet oplysninger.</p>
          <h3>Ret til at slette (”Retten til at blive glemt”)</h3>
          <p>Hvis SDFE opbevarer personoplysninger, du ikke ønsker opbevaret, har du som hovedregel ret til at få dem slettet. Herudover bliver der også registreret ip-adresser på anvendere af styrelsens data (i sikkerhedslogs og til statistisk brug).</p>
          <h3>Ret til at gøre indsigelse mod behandling</h3>
          <p>Du har ret til at gøre indsigelse mod behandlingen af dine personoplysninger. Hvis du gør indsigelse, skal SDFE påvise tungtvejende årsager til at opretholde behandlingen, som kunne være, at behandlingen følger af loven. Er dette ikke muligt, skal behandlingen ophøre.</p>
          <h3>Begrænsning af behandlingen</h3>
          <p>Du har ret til at få begrænset behandlingen af dine personoplysninger, hvis én af en række betingelser er opfyldt. Betingelsen kan bl.a. være, at du mener, at de personoplysninger, der behandles om dig, ikke er rigtige. Det kan også være du mener, at dine oplysningerne behandles ulovligt, men at du ikke ønsker dem slettet og derfor anmoder om begrænset behandling eller du gør brug af din ret til at gøre indsigelse mod vores behandling af dine personoplysninger.</p>
          <h3>Tilbagekaldelse af samtykke</h3>
          <p>Hvis en behandling af dine data sker på baggrund af et samtykke, du har givet, har du ret til at tilbagekalde dette samtykke. Det kan være i det tilfælde, hvor du har oprettet dig som bruger på Historiske Kort.</p>
          <h3>Ret til at kontakte DPO’en</h3>
          <p>Du kan kontakte SDFE’s DPO i persondataspørgsmål, der vedrører styrelsens egne behandlingsaktiviteter eller behandlinger, der foretages af andre og som styrelsen måtte være ansvarlig for.</p>
          <h3>Klagemuligheder</h3>
          <p>Du har endvidere ret til at indgive en klage til Datatilsynet, hvis du er utilfreds med SDFE’s behandling af oplysninger om dig. Du kan finde tilsynets kontaktoplysninger på www.datatilsynet.dk. Det er ikke en forudsætning, at du først har taget kontakt til os, men du skal vide, at vi tager imod enhver henvendelse med konkrete klagepunkter, så vi hurtigst muligt kan komme i dialog med dig, herunder afklare de faktuelle forhold i lyset af dine rettigheder.</p>
        </div>
      </div>
      <div class="right-col text-small" :style="{ 'background-color' : this.$themeColors.background }">
        <h3>Er der andre modtagere af dine oplysninger?</h3>
        <p>Som dataansvarlig er SDFE i nogle tilfælde forpligtet til at overføre personoplysninger til andre offentlige myndigheder og styrelsens egne systemleverandører. Herudover overføres personoplysninger fra en række registre via Datafordeleren til eksterne modtagere, som primært indsamler data til brug for imødekommelsen af deres forpligtelser som enten myndighed eller privat virksomhed.</p>
        <h3>Hvor længe opbevarer vi dine oplysninger?</h3>
        <p>I sin myndighedsudøvelse har SDFE lovhjemmel til at registrere visse personoplysninger og er samtidigt forpligtet til at opdatere og opbevare dem på betryggende vis, dog ikke i længere tid, end hvad lovgivningen giver mulighed for. SDFE opbevarer personoplysninger efter principperne i databeskyttelsesforordningen. For registrenes vedkommende spiller sletning ved ajourføring en vigtig rolle, fordi det sikrer datakvaliteten.</p>
        <h3>Sikkerhed</h3>
        <p>Når vi modtager dine oplysninger, sørger vi for, at de bliver behandlet sikkert. Vi har nemlig implementeret en række tekniske og organisatoriske sikkerhedsforanstaltninger, som beskytter mod hændelig eller ulovlig tilintetgørelse samt tab og forvanskning af oplysningerne. Der er desuden lavet foranstaltninger, som sikrer, at dine oplysninger ikke kommer uvedkommende til kendskab, misbruges eller i øvrigt behandles i strid med databeskyttelsesforordningen.</p>
        <h3>Cookies</h3>
        <p>Vi benytter cookies på Historiske Kort. Det betyder at der kan placeres informationer på din computer, så styrelsen har mulighed for at identificere dig som unik besøgende. Disse oplysninger kaldes typisk for cookies, og de kan hjælpe styrelsen med at finde ud af, hvordan og til hvilke formål besøgende bruger hjemmesiden. Du kan læse mere om SDFE’s brug af cookies <router-link to="/CookiePolitik">her</router-link>.</p>
      </div>
    </div>
    <div class="row">
      <div class=" left-col">
        <div class="content text-small">
          <h1>Har du spørgsmål?</h1>
          <p>Hvis du har spørgsmål vedrørende SDFE’s behandling af personoplysninger,er du velkommen til at kontakte os på sdfe@sdfe.dk. Her kan du også henvende dig, hvis du ønsker at benytte dig af nogle af de skitserede rettigheder, eller hvis du ønsker at klage over behandling af oplysninger om dig.</p>
          <p>Hvis du som registreret har spørgsmål til dine rettigheder, er du velkommen til at kontakte SDFE’s Databeskyttelsesrådgiver (DPO), hvis kontaktoplysninger findes her. DPO er en forkortelse for Data Protection Officer.</p>
          <p>Vores DPO er en slags intern ”databeskyttelsesombudsmand”. DPO’en skal inddrages i alle spørgsmål om databeskyttelse og rådgiver SDFE om databeskyttelsesretlige regler.</p>
          <p>Dette indebærer, at DPO’en rådgiver ledere og ansatte i spørgsmål, der handler om databeskyttelse. Det kan fx handle om situationer, hvor der er tvivl om korrekt behandling af personoplysninger.</p>
          <p>DPO’en yder også organisationen vejledning i forhold til indkøb af nye it-systemer, udarbejdelse af databehandlingspolitikker og om, hvorvidt håndteringen af personoplysninger overholder reglerne.</p>
        </div>
      </div>
      <div class="right-col">
        <div class="content text-small">
          <h6>Databeskyttelsesrådgiver</h6>
          <LinkCard
            header="DPO@kefm.dk"
            headerLink="mailto:DPO@kefm.dk"
            description="Har du som registreret spørgsmål til dine rettigheder, er du velkommen til at kontakte SDFE’s Databeskyttelsesrådgiver (DPO)"
            icon="MailIcon"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1 class="content">Behandling af personoplysninger</h1>
        <h2 class="content">I det følgende finder du en fortegnelse over SDFE’s behandling af personoplysninger på Historiske Kort.</h2>
        <br/>
        <Table :headers="privacyHeaders" :data="privacyData"/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Persondata',
  components: {
    Menu: defineAsyncComponent(() => import('@/components/about/Menu')),
    Header: defineAsyncComponent(() => import('@/components/about/Header')),
    LinkCard: defineAsyncComponent(() => import('@/components/shared/LinkCard')),
    Table: defineAsyncComponent(() => import('@/components/shared/Table'))
  },
  data () {
    return {
      header: 'Persondatapolitik på historiskekort.dk',
      subheader: 'Styrelsen for Dataforsyning og Effektiviserings behandling af personoplysninger på Historiske Kort',
      version: '1.0',
      updated: new Date(2020, 8, 24),
      privacyHeaders: [
        {
          key: 'services',
          text: 'Forretningsservices'
        },
        {
          key: 'activities',
          text: 'Behandlingsaktiviteter'
        },
        {
          key: 'purpose',
          text: 'Formål'
        },
        {
          key: 'informationcategory',
          text: 'Personoplysningskategori'
        },
        {
          key: 'personcategory',
          text: 'Personkategori'
        }
      ],
      privacyData: [
        {
          services: 'Support for udstilling af SDFE og foregående institutioners historiske kortdata via Historiske Kort og distribution af data via Kortforsyningen',
          activities: 'Håndtere brugerstyring ift. Historiske Kort, herunder monitorere loggen',
          purpose: 'At sikre en lovlig brugerstyring ift. Historiske Kort, herunder monitorering af loggen',
          informationcategory: 'Kontaktoplysninger<br/>Logning af transaktioner<br/>(ip-adresser)<br/>Positionsoplysninger fra GIS-klienter',
          personcategory: 'Private brugere<br/>Myndighedsbrugere<br/>Virksomhedsbrugere'
        },
        {
          services: 'Business Analytics',
          activities: 'Indsamling, opbevaring og analyser af logningsdata fra SDFE’s hjemmesider',
          purpose: 'At foretage indsamling og videre behandling af logningsdata til brug for inddeling af aktiviteten på brugergruppe-niveau med henblik på forbedring af produkter og fejlhåndtering',
          informationcategory: 'Brugernavn og kontaktoplysninger (registrerede brugere) Ip-adresser',
          personcategory: 'Private brugere<br/>Myndighedsbrugere<br/>Virksomhedsbrugere'
        }
      ]
    }
  }
}
</script>

<style scoped>
h3 {
  padding-top: 1rem;
}
.link {
  border-top: 1px solid var(--darkSteel);
  padding: 1rem;
}
.row {
  border-top: 1px solid var(--action);
  display: flex;
  padding-top: 1rem;
}
.row__one {
  border-top: 0;
  padding-top: 0;
}
.left-col {
  width: 70%;
  margin-left: 4vw;
  padding-right: 3.5vw;
}
.col {
  margin-left: 4vw;
  margin-right: 5vw;
}
.content,
.left-col > div {
  padding-left: 1vw;
}
.right-col {
  padding: 1vw 5vw 1vw 1vw;
  width: 30%;
}
.page-wrapper {
  padding-bottom: 5vw;
  border-bottom: 1px solid var(--action);
}
</style>
