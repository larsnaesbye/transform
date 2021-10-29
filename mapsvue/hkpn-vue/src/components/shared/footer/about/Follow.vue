<template>
  <article>
    <h2>Følg Os</h2>
    <h6
        class="h6_caption"
    >
      <Icon
          icon="MailIcon"
          :width="1.5"
          :height="1.5"
          :color="colors.black"
      />
      <span>
        Nyhedsbrev
      </span>
    </h6>
    <ul>
      <li>
        <a href="https://sdfe.dk/data-skaber-vaerdi/nyheder">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Styrelsen for Dataforsyning og Effektivisering
          </span>
        </a>
      </li>
      <li>
        <a href="">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Dataforsyningen
          </span>
        </a>
      </li>
    </ul>
    <h6
        class="h6_caption"
    >
      <Icon
          icon="LinkedinIcon"
          :width="1.5"
          :height="1.5"
          :color="colors.linkedin"
      />
      <span>
        Linkedin
      </span>
    </h6>
    <ul>
      <li>
        <a href="https://www.linkedin.com/company/styrelsen-for-dataforsyning-og-effektivisering">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Styrelsen for Dataforsyning og Effektivisering
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/groups/7300830">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Datafordeler
          </span>
        </a>
      </li>
    </ul>
    <h6
        class="h6_caption"
    >
      <Icon
          icon="YoutubeIcon"
          :width="1.5"
          :height="1.5"
          :color="colors.youtube"
      />
      <span>
        Youtube
      </span>
    </h6>
    <ul>
      <li>
        <a href="https://www.youtube.com/user/Kortforsyningen">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Kortforsyningens videoer
          </span>
        </a>
      </li>
    </ul>
    <h6
        class="h6_caption"
    >
      <Icon
          icon="TwitterIcon"
          :width="1.5"
          :height="1.5"
          :color="colors.twitter"
      />
      <span>
        Twitter
      </span>
    </h6>
    <ul>
      <li>
        <a href="https://twitter.com/SDFEtweet">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Styrelsen for Dataforsyning og Effektivisering
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/datafordeler">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Datafordeler
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/Kortforsyningen">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            PIP Kortforsyningen
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/DK_DHM">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Danmarks Højdemodel
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/SDFE_RS">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            GeoDanmark fotoflyvning
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/LerDrift">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Ledningsejerregisteret
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/dkadresser?lang=da">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Danmarks adresser
          </span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/AWS_Suiten?lang=da">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            AWS Suiten
          </span>
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Follow',
  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
  flex-direction: column;
}

h2 {
  padding-left: 1rem;
  border-bottom: 1px solid var(--darkSteel);
  padding-bottom: 0.8rem;
  margin-bottom: 0.6rem;
}

h6 {
  margin-top: 0;
  padding-top: 0;
  border-bottom: 1px solid var(--darkSteel);
  margin-left: 1rem;
  color: var(--turquoise);
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
}

h6 span {
  margin-top: 0.125rem
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

ul:last-of-type {
  margin-bottom: 0;
}

li {
  font-size: 0.875rem;
  line-height: 1.125rem;
  margin-bottom: 0.14rem;
}

li a {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

span {
  margin-left: 0.5rem;
}

svg {
  align-self: center;
  flex-shrink: 0;
}

</style>
