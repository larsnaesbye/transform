<template>
  <div
      class="search-bar"
      ref="searchbar"
      @mouseenter.stop="isHovering = true"
      @mouseleave.stop="isHovering = false"
  ></div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style scoped>
.search-bar {
  display: flex;
  min-width: 5.2rem;
  border-radius: 20rem;
  margin-top: 0.5rem;
  flex-grow: 1;
  justify-content: flex-start;
}
</style>
