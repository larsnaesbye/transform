<template>
  <div class="input">
    <label v-if="label">{{ label }}</label>
    <input
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
      }"
      class="field">
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .input
    display flex
    flex-direction column

  label
    color var(--darkSteel)
    font-weight bold
    font-size 0.625rem
    line-height 0.75rem
    letter-spacing 0.1em
    text-transform uppercase
    width 100%

  input
    color var(--turkis)
    border 0
    width 100%
    height 2rem
    font-weight 300
    font-size 0.875rem
    padding 0
    width 100%

  input:focus
    outline none

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance none
    margin 0

  /* Firefox */
  input[type=number]
    -moz-appearance textfield

</style>
