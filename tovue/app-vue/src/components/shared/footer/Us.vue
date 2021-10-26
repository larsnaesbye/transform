<template>
  <article aria-label="om os">
    <h2>
      Om os
    </h2>
    <a class="dataforsyningen-logo" href="https://dataforsyningen.dk" target="_blank">
      <Icon
        icon="CrownCirclesLogo"
        :width=".11"
        :height=".11"
        :strokeWidth="0.3"
        color="#000"
      />
      <div class="dataforsyningen-logo__text">
        <div class="title">Dataforsyningen</div>
        <div class="paragraph_lille">Styrelsen for Dataforsyning og Effektivisering</div>
      </div>
    </a>
    <p>
      Forsyningsdataportal.dk er en del af Dataforsyningen.dk.
      Sitet administreres af Styrelsen for Dataforsyning og Effektivisering
    </p>
    <address>
      Support – SDFE <br />
      <a
        href="tel:+4578768792"
        class="icon-link"
      >
        <Icon
          icon="PhoneIcon"
          :width="1.5"
          :height="1.5"
          :strokeWidth="1"
          color="#000"
        />
        <span>Tlf. 7876 8792</span>
      </a>
      <a
        href="mailto:sdfe@sdfe.dk"
        class="icon-link"
      >
        <Icon
          icon="MailIcon"
          :width="1.5"
          :height="1.5"
          :strokeWidth="0.5"
          color="#000"
        />
        <span>support@sdfe.dk</span>
      </a>
      Vi har åbent alle hverdage kl. 10:00-15:00.
    </address>
    <ul class="info-links">
      <li>
        <router-link to="/om" class="icon-link">
          <Icon
            icon="MoreIcon"
            :width="1.5"
            :height="1.5"
            color="#000"
          />
          <span>
            Om Forsyningsdata
          </span>
        </router-link>
      </li>
      <li>
        <a href="https://dataforsyningen.dk/Persondata" class="icon-link" target="_blank">
          <Icon
            icon="MoreIcon"
            :width="1.5"
            :height="1.5"
            color="#000"
          />
          <span>
            Persondatapolitik
          </span>
        </a>
      </li>
      <li>
        <router-link to="/cookies" class="icon-link">
          <Icon
            icon="MoreIcon"
            :width="1.5"
            :height="1.5"
            color="#000"
          />
          <span>
            Cookiepolitik
          </span>
        </router-link>
      </li>
      <li>
        <a href="https://www.was.digst.dk/forsyningsdataportal-dk" target="_blank" class="icon-link">
          <Icon
            icon="MoreIcon"
            :width="1.5"
            :height="1.5"
            color="#000"
          />
          <span>
            Webtilgængelighedserklæring
          </span>
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'Us'
}
</script>

<style lang="stylus" scoped>
.dataforsyningen-logo
  display flex
  padding-left 1rem

.dataforsyningen-logo .title
  margin-top .5rem
  margin-bottom 0
  padding-left 8px
  font-size 0.75rem
  line-height 0.875rem
  font-weight 500
  letter-spacing 0.06rem
  text-transform uppercase

.dataforsyningen-logo .paragraph_lille
  padding-left 8px

article
  display flex
  flex-direction column

h2
  padding-left 1rem
  border-bottom 1px solid var(--darkSteel)
  padding-bottom 0.8rem
  margin-bottom 0.8rem

p
address
ul
  margin-top 0
  margin-bottom 0.8rem
  padding-left 1rem
  font-size 0.875rem
  line-height 1.125rem

a.icon-link
  display flex
  flex-direction row
  align-items center
  margin-top 0.125rem
  margin-bottom 0.125rem

  & span
    margin-left 0.5rem
    font-size 0.875rem
    line-height 1.125rem

ul.info-links
  list-style none

  & li
    margin-bottom 0.125rem
</style>
