<template>
  <section class="page">
    <nav
      class="page__header"
      aria-label="faner på datasæt"
    >
      <Icon
        :icon="'DatasetIcon'"
        :width="2"
        :height="2"
        :color="'white'"
      />
      <button
        v-for="item in items"
        :key="`${ _uid }_item_${ item.id }`"
        class="page__button anim-underline button-reset"
        :class="{ 'active': item.isActive }"
        @click="onSelect(item)"
        :aria-label="'faneblad for ' + item.title"
      >
        {{ item.title }}
      </button>
    </nav>
    <div class="page__sections">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageNavigation',
  data () {
    return {
      items: [],
      currentItem: null
    }
  },
  created () {
    this.$nextTick(() => {
      // _isSection is a computed property on child
      this.items = this.$children.filter(section => section._isSection)
      // isActive is a prop on child
      this.currentItem = this.items.find(section => section.isActive)

      // Set the fist tab to active if none predefined
      if (!this.currentItem && this.items.length > 0) {
        this.currentItem = this.items[0]
        this.currentItem.isActive = true
      }
    })
  },
  methods: {
    onSelect (item) {
      this.$emit('select', item.name)
    }
  }
}
</script>
<style lang="stylus" scoped>

nav
  padding 0 5vw
  border-bottom .5px solid var(--lightSteel)

.page__button
  padding 1rem 0
  margin-left 1rem
  position relative

button.page__button:focus
  color var(--highlight)
  border none
  box-shadow none

.page__button.active
  border-color var(--active)

.page__sections
  width 100%
  padding 2vw 5vw 3.5vw
</style>
