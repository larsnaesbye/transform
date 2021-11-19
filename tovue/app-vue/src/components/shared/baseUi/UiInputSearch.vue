<template>
  <div
      class="search-box__container"
      @mouseenter.stop="isHovering = true"
      @mouseleave.stop="isHovering = false"
  >
    <label v-if='label!==""'
           class="paragraph_micro"
           for="search"
    >
      {{ label }}:
    </label>
    <input type="text" :value="value" @input="input" ref="searchInput" id="search" placeholder="Søg">
    <Icon
        v-if="!showCloseIcon"
        icon="SearchIcon"
        :width="2"
        :height="2"
        :color="$themeColors.dark"
        :key="'searchIcon'"
        class="search-icon"
    />
    <Icon
        v-if="showCloseIcon"
        icon="CloseIcon"
        :width="2"
        :height="2"
        :color="$themeColors.dark"
        :key="'searchCloseIcon'"
        class="search-icon"
        @click.native="resetSearch()"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Søg'
    }
  },
  data() {
    return {
      isHovering: false,
      showCloseIcon: false
    }
  },
  computed: {},
  methods: {
    input(event) {
      this.showCloseIcon = event.target.value.length > 0
      this.$emit('input', event.target.value)
    },
    resetSearch() {
      this.$refs.searchInput.value = ''
      this.$refs.searchInput.focus()
      this.$emit('input', '')
      this.showCloseIcon = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-box__container
  // display flex
  justify-content flex-start
  flex-grow 1
  min-width 200px
  position relative
  flex-shrink 1

.search-box__container > label
  margin-left .5rem

.search-box
.search-box__container input
  display block
  width 100%
  height calc(2rem + 2px)
  border-radius calc(2rem - 2px)
  border 1px solid var(--darkSteel)
  background var(--white)
  padding-left 1rem
  outline none
  transition all 200ms ease-in-out

.search-box__container input:focus
  outline none
  border 1px solid rgba(0, 0, 0, 0)
  box-shadow: 0 0 0 2pt var(--highlight);

.search-icon
  position absolute
  bottom 0
  right 0

.tooltip p
  margin 0
  padding 1rem

</style>
