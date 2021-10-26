<template>
<div class="pagination">
  <p class="paragraph_micro">Side {{pagination.currentPage}} af {{pagination.totalPages}}</p>
  <div class="pagination-controls">
    <button
      class="buttonmaster icon-only pagination-previous"
      :disabled="!pagination.prevPage"
      @click="$emit('prev')"
      aria-label="Forrige side med resultater"
    >
      <Icon
        icon="PrevIcon"
        :color="'black'"
        :width="2"
        :height="2"
        :key="'collapseIcon'"
      />
    </button>

    <button
      class="buttonmaster icon-only pagination-next"
      :disabled="!pagination.nextPage"
      @click="$emit('next');"
      aria-label="Næste side med resultater"
    >
      <Icon
        icon="NextIcon"
        :color="'black'"
        :width="2"
        :height="2"
        :key="'collapseIcon'"
      />
    </button>
  </div>
</div>
</template>

<script>
export default {
  props: ['pagination', 'client']
}
</script>

<style lang="stylus">
.pagination
  justify-content flex-end !important
  & > .paragraph_micro
    text-align center
  & i
    color: #3273dc !important

.pagination-controls > button
  margin-right .5rem

.pagination-controls > button:last-child
  margin-right 0
</style>
