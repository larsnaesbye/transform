<template>
  <header class="layout-3col">
    <Brand />
    <div>
      <Search />
      <Nav />
    </div>
  </header>
</template>

<script>
import Brand from '@/components/shared/header/Brand'
import Nav from '@/components/shared/header/Nav'
import Search from '@/components/shared/header/Search'

export default {
  name: 'Header',
  components: { Brand, Search, Nav }
}
</script>

<style scoped>

header{
  position: absolute;
  width: 100%;
  z-index: 0;
  top: 0;
  padding: 2rem 5vw 1rem 5vw;
  align-items: flex-start;
  grid-template-rows: auto;
}

div {
  grid-column: 2 / -1;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
}
</style>
