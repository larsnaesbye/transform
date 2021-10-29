<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" :style="{'--bullet-color': bulletColor, '--text-color': textColor}">
      <span v-html="item"/>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'List',
  props: {
    items: {
      type: Array
    },
    bulletColor: {
      type: String
    },
    textColor: {
      type: String
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 1rem;
}
ul li::before {
  content: "\2022";
  color: var(--bullet-color);
  font-weight: bold;
  display: inline-block;
  width: 1rem;
  margin-left: 0.5rem;
  font-size: 1.5em;
}
li {
  color: var(--text-color);
  padding-left: 0.5rem;
  white-space: nowrap;
  vertical-align: middle;
}
span {
  vertical-align: middle;
}
</style>
