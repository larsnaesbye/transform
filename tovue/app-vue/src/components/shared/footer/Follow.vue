<template>
  <article aria-label="links til sociale medier">
    <h2>
      Følg med
    </h2>
    <ul>
      <li>
        <a href="https://sdfe.dk/data-skaber-vaerdi/nyheder" target="_blank">
          <h6
              class="h6_caption"
          >
            <Icon
                icon="MailIcon"
                :width="1.5"
                :height="1.5"
                :color="this.$themeColors.black"
            />
            <span>
              Nyhedsbrev
            </span>
          </h6>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/styrelsen-for-dataforsyning-og-effektivisering" target="_blank">
          <h6
              class="h6_caption"
          >
            <Icon
                icon="LinkedinIcon"
                :width="1.5"
                :height="1.5"
                :color="this.$themeColors.linkedin"
            />
            <span>
              Linkedin
            </span>
          </h6>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/SDFEtweet" target="_blank">
          <h6
              class="h6_caption"
          >
            <Icon
                icon="TwitterIcon"
                :width="1.5"
                :height="1.5"
                :color="this.$themeColors.twitter"
            />
            <span>
              Twitter
            </span>
          </h6>
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'Follow'
}
</script>

<style lang="stylus" scoped>
article
  display flex
  flex-direction column

h2
  padding-left 1rem
  border-bottom 1px solid var(--darkSteel)
  padding-bottom 0.8rem
  margin-bottom 0.6rem

h6
  margin-top 0
  padding-top 0
  margin-left .125rem
  color var(--linkColor)
  width max-content
  display flex
  flex-direction row
  align-items center

h6 span
  margin-top 0.125rem

ul
  list-style none
  margin 0
  padding 0
  padding-left 0.5rem
  display flex
  flex-direction column

li
  font-size 0.875rem
  line-height 1.125rem
  margin-bottom 0.14rem

li a
  display flex
  flex-direction row
  align-items center
  cursor pointer

span
  margin-left 0.5rem

svg
  align-self center
  flex-shrink 0
</style>
