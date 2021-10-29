<template>
  <Background />
  <header>
    <div class="header_text">
      <h1>{{header}}</h1>
      <h2>{{subheader}}</h2>
      <p>Version {{version}}, {{updatedFormated}}</p>
    </div>
    <div class="header_icon">
      <Icon
          :icon="icon"
          :height="5"
          :width="5"
          :strokeWidth="0.5"
          :color="$themeColors.black"
        />
    </div>
  </header>
</template>

<script>
import dayjs from 'dayjs'
import Background from '@/components/shared/HeaderBackground'

export default {
  name: 'Header',
  components: { Background },
  props: {
    icon: {
      type: String,
      default: 'InfoIcon'

    },
    header: {
      type: String
    },
    subheader: {
      type: String
    },
    version: {
      type: String
    },
    updated: {
      type: Date
    }
  },
  computed: {
    updatedFormated () {
      return dayjs(String(this.updated)).format('MMMM YYYY')
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 5rem;
  padding-bottom: 2rem;
  display: flex;
  border-bottom: 1px solid var(--action);
}
header > * {
  margin-left: 5vw;
}
.header_icon {
  border: 2px solid var(--mediumSteel);
  border-radius: 4rem;
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 10vw;
}
p {
  color: var(--darkSteel);
  font-style: italic;
}
</style>
