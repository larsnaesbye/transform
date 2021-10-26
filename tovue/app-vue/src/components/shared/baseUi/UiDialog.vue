<template>
  <div
    class="ui-dialog__mask"
    @click.self="$emit('close')"
    aria-label="Luk popup"
  >
    <div
      class="ui-dialog__container"
      :style="'background-color:' + backgroundColor + ';border-color:' + color + ';color:' + color + ';'"
    >
      <div
        class="ui-dialog__header white-text"
        :style="'background-color:' + color + ';'"
      >
        <div> {{ title }}</div>
        <button
          class="button-reset cursor-point"
          @click="$emit('close')"
        >
          <Icon
            icon="CloseIcon"
            :width="2"
            :height="2"
            :color="'white'"
          />
        </button>
      </div>
      <div class="ui-dialog__sections">
        <slot />
      </div>
      <div
        class="ui-dialog__footer"
        v-if="footer"
      >
        <Icon
          :icon="footerIcon"
          :color="color"
          width="1.5"
          height="1.5"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'FTP'
    },
    color: {
      type: String,
      default: '#000'
    },
    backgroundColor: {
      type: String,
      default: '#AAA'
    },
    footer: {
      type: Boolean,
      default: false
    },
    footerIcon: {
      type: String,
      default: 'downloadIcon'
    }
  },
  data () {
    return {
      collapsed: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui-dialog__mask
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0,0,0,0.85)
  z-index 500
  max-height 100vh
  display flex
  justify-content center
  align-items center

.ui-dialog__container
  border 2px solid
  border-radius 1rem
  margin-bottom 1rem
  min-width 400px
  max-width 600px
  overflow hidden
  background white
  cursor default

.ui-dialog__header
  display flex
  justify-content space-between
  align-items center
  padding .4rem 1rem

.ui-dialog__footer
  display flex
  justify-content flex-end
  align-items center
  padding .4rem 1rem

.ui-dialog__sections
  color var(--dark)
  overflow hidden
  transition max-height 0.45s ease-in-out
  max-height 400px

.ui-dialog__sections.collapsed
  max-height 0 !important
  padding 0
  margin 0

.service-box-content p
  margin-top 0

</style>
