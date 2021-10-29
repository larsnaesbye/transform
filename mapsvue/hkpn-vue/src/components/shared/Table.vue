<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key"><h6>{{header.text}}</h6></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rowData, index) in data" :key="index">
        <td v-for="header in headers" :key="header.key">
          <span v-html="rowData[header.key]"/>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  name: 'Table',
  props: {
    headers: {
      type: Array
    },
    data: {
      type: Array
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
thead {
  border-bottom: 1px solid var(--action);
}
tbody > tr {
  border-bottom: 1px solid var(--darkSteel);
}
th {
  text-align: left;
}
td {
  vertical-align: top;
  padding: 0.5rem 0;
}
th:nth-child(n),
td:nth-child(n) {
  padding-left: 1vw;
}
</style>
