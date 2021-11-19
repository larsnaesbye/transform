<template>
  <div
      class="dropdown"
  >
    <label v-if='label!==""'
           class="paragraph_micro"
           :for="label"
    >
      {{ label }}:
    </label>

    <div
        class="dropdown-input"
        v-click-outside="{
        exclude: [`dropdown-list_${_uid}`, `dropdown-button_${_uid}`],
        handler: 'close'
      }"
        :class="open ? 'open' : ''"
        @click="toggleDropdown"
        @keydown.enter="toggleDropdown"
        :id="label"
        tabindex="0"
    >
      <div
          class="choosen cursor-point"
      >
        <slot name="choosen"><span>Alle</span></slot>
      </div>
      <button
          @click.stop="toggleDropdown"
          class="buttonmaster no-select no-border"
          :ref="`dropdown-button_${_uid}`"
          :aria-label="(open ? 'luk dropdown: ' : 'åbn dropdown: ') + label"
          tabindex="-1"
      >
        <Icon
            v-if="!open"
            :key="`dropdown_${_uid}_ChevronDownIcon`"
            icon="ChevronDownIcon"
            :width="2"
            :height="2"
            :color="'black'"
            class="cursor-point"
        />
        <Icon
            v-if="open"
            :key="`dropdown_${_uid}_ChevronUpIcon`"
            icon="ChevronUpIcon"
            :width="2"
            :height="2"
            :color="'black'"
            class="cursor-point"
        />
      </button>
    </div>
    <div
        class="dropdown-list"
        :ref="`dropdown-list_${_uid}`"
        :class="{ 'select-hide': !open }"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      open: false
    }
  },
  watch: {
    open(newValue, oldValue) {
      if (this.open) {
        this.$emit('open', this._uid)
      }
    }
  },
  methods: {
    close() {
      this.$nextTick(() => {
        this.open = false
      })
    },
    toggleDropdown(event) {
      this.open = !this.open
    }
  }
}
</script>

<style lang="stylus" scoped>
.dropdown
  // display flex
  justify-content flex-start
  position relative
  outline none

.dropdown > label
  margin-left .5rem

.dropdown-input
  display flex
  align-items center
  justify-content space-between
  box-sizing border-box
  flex-grow 1
  flex-shrink 1
  min-width 6.5rem
  max-width 20rem
  height 34px
  padding-left .5rem
  border 1px solid var(--darkSteel)
  border-radius calc(1rem + 1px)
  background var(--white)
  transition all 200ms ease-in-out

.dropdown-input:focus
  outline none
  border 1px solid rgba(0, 0, 0, 0)
  box-shadow: 0 0 0 2pt var(--highlight);

.dropdown-input.open
  background-color var(--lightSteel)
  filter drop-shadow(0 4px 4px var(--lightGrey))

.dropdown-input > div.choosen
  flex-grow 1
  border none
  outline none
  white-space nowrap

.dropdown-list
  position absolute
  top 3.5rem
  right 0
  min-height 4rem
  max-height 20rem
  min-width 7.5rem
  background-color var(--lightSteel)
  padding 1rem
  box-sizing border-box
  border 1px solid var(--darkSteel)
  border-radius calc(1rem + 1px)
  filter drop-shadow(0 4px 4px var(--lightGrey))
  overflow scroll
  z-index 3

.dropdown-list label
  white-space nowrap

.select-hide
  display none

.dropdown-list-element label
  margin-left .5rem

.dropdown-list-element input + label + img.loader
  width 1rem
  height 1rem
  visibility hidden
  border none
  margin-left 5px
  margin-right -5px

.dropdown-list-element input:active + label + img.loader
  visibility visible
</style>
