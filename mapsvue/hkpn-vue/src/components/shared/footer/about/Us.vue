<template>
  <article>
    <h2>
      Om os
    </h2>
    <address>
      <p>
        Styrelsen for Dataforsyning og Effektivisering
        <br>
        Rentemestervej 8
        <br>
        2400 København NV
      </p>
      <a
          href="tel:+4572545500"
      >
        <Icon
            icon="PhoneIcon"
            :width="1.5"
            :height="1.5"
            :color="colors.black"
        />
        <span>7254 5500</span>
      </a>
      <a
          href="mailto:sdfe@sdfe.dk"
      >
        <Icon
            icon="MailIcon"
            :width="1.5"
            :height="1.5"
            :color="colors.black"
        />
        <span>sdfe@sdfe.dk</span>
      </a>
      <p>
        EAN-nummer: 5798009813640
        <br>
        CVR-nummer: 37 28 41 14
      </p>
    </address>
    <ul>
      <li>
        <router-link to="/About">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Om Historiske Kort
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/Persondata">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Persondatapolitik
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/CookiePolitik">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Cookiepolitik
          </span>
        </router-link>
      </li>
      <li>
        <a href="https://www.was.digst.dk/dataforsyningen-dk" target="_blank">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Webtilgængelighedserklæring
          </span>
        </a>
      </li>
      <!--<li>
        <a>
          <Icon
            icon="MoreIcon"
            :width="1.5"
            :height="1.5"
            :color="this.$themeColors.black"
          />
          <span>
            Visit our English Website
          </span>
        </a>
      </li>-->
    </ul>
  </article>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Us',
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
  margin-bottom: 0.8rem;
}

address {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  font-style: normal;
}

p {
  margin-top: 0;
  margin-bottom: 0.3rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
}

address a {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.13rem;
}

address a:last-of-type {
  margin-bottom: 0.33rem;
}

span {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
}

p:last-of-type {
  margin-top: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 1rem;
}

li {
  margin-bottom: 0.125rem;
}

li a {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

svg {
  align-self: center;
  flex-shrink: 0;
}
</style>
