<template>
  <article aria-label="Partnerlinks">
    <h2>
      Besøg også
    </h2>
    <ul class="info-links">
      <li>
        <a href="https://kefm.dk" target="_blank" rel="noopener">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="this.$themeColors.black"
          />
          <span>
            Klima-, Energi- og Forsyningsministeriet
          </span>
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'Visit'
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
  margin-bottom 0.8rem

h6
  margin-top 0.8rem
  padding-left 1rem

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
  margin-top 0.33rem
  margin-bottom 0.33rem

  & span
    margin-left 0.5rem
    font-size 0.875rem
    line-height 1.125rem

ul.info-links
  list-style none

  & li
    margin-bottom 0.125rem
</style>
