<template>
  <article
    class="box__large position-relative"
    :title="linkTitle"
    @mouseover.stop="isHovering = true"
    @mouseleave.stop="isHovering = false"
    tabindex="0"
    @keydown.enter="$router.push(link)"
    :aria-label="linkTitle"
  >
    <router-link
      :to="link"
      class="cursor-point"
    >
      <div class="image-container">
        <div
          :style="'background-image: url(' + imageUrl + ');'"
          class="image"
          :class="{ 'blend-in': imageUrl }"
        ></div>
      </div>
      <header>
        <h3>
          {{ title }}
        </h3>
      </header>
      <section class="flex-height">
        <p
          class="paragraph_lille"
        >
          {{ summary }}
        </p>
      </section>
      <footer class="align-right">
        <Icon
          icon="MoreIcon"
          :height="1.5"
          :width="1.5"
          class="more-icon transition-200ms"
          :color="this.$themeColors[(isHovering) ? 'white' : 'black']"
          :backgroundColor="this.$themeColors[(isHovering) ? 'action' : 'white']"
        />
      </footer>
    </router-link>
    <span v-if="imageUrl" class="link-box__credit white-text">{{ photoCredit }}</span>
  </article>
</template>

<script>
export default {
  name: 'LinkBox',
  data () {
    return {
      isHovering: false
    }
  },
  props: {
    link: {
      type: String,
      default: '/'
    },
    linkTitle: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    photoCredit: {
      type: String,
      default: 'Foto: Lars Schmidt / schmidtaps.com'
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
article
  min-width 15rem
  max-width 44rem
  width auto

article > a
  display flex
  flex-direction column
  width 100%
  height 100%
  color var(--black)
  &:hover
    text-decoration none;

header
  display flex
  flex-direction row
  padding 1rem 1rem 0 1rem
  align-items center

section
  padding 0 1rem
  &:last-child
    padding 0 1rem 1rem

section.flex-height
  margin-bottom auto

p
  margin-top 0

footer
  align-self flex-end
  padding 0 1rem 1rem

.image-container
  display flex
  flex-direction column
  width 100%
  height 15vh
  min-height 15vh
  background-color var(--lightGrey) !important

.image
  height 15vh
  min-height 15vh
  background-repeat: no-repeat;
  background-position center center
  background-size: cover;

.link-box__credit
  position absolute
  right: .5rem
  top .5rem
  color white
  font-size .8rem
  opacity .6

.blend-in {
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 0.5s; /* Opera */
}
@-webkit-keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>
