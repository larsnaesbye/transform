<template>
  <div class="skipnav">
    <a href="#maincontent">Spring til sidens hovedindhold</a>
  </div>
</template>

<script>
</script>

<style lang="stylus" scoped>
.skipnav
  text-align: left
.skipnav a
  position: absolute
  left: -10000px
  width: 1px
  height: 1px
  overflow: hidden

.skipnav a:focus, .skipnav a:active
  position: absolute
  left: 0
  top: 0
  z-index: 100
  padding .2rem 1rem
  background: white
  width: auto
  height: auto
  overflow: visible
  text-decoration: underline

</style>
