<template>
  <div
    :class="{ 'active': isActive }"
    v-show="active"
    class="page__section"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageNavigationSection',
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    _isSection () {
      return true
    },
    id () {
      return this.$vnode.key || `PageNavigationSection_${this._uid}`
    }
  },
  watch: {
    isActive (val) {
      if (val) {
        // Emit event when tab is selected
        // this.$emit('onSelect', this.id)
      }
    },
    active (val) {
      this.isActive = val
    }
  },
  created () {
    this.isActive = this.active
  }
}
</script>
<style lang="stylus" scoped>
</style>
