<template>
    <Icon
        v-if="showLoadingIcon"
        class="loading-icon"
        icon="LoadingIcon2"
        :width="7"
        :height="7"
        :color="colors.action"
        :strokeWidth="1"
    />
  <section v-if="!showLoadingIcon">
    <p>Der blev desværre ikke fundet nogle resultater for de følgende filtrer. Prøv at ændre din søgning.</p>
  </section>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  name: 'NoResultsFound',
  setup () {
    const colors = inject('themeColors')
    const showLoadingIcon = ref(true)
    // eslint-disable-next-line no-return-assign
    setTimeout(() => showLoadingIcon.value = false, 5000)
    return {
      colors,
      showLoadingIcon
    }
  }
}
</script>

<style scoped>
section {
  height: 60vh;
  width: 100%;
}
.loading-icon {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
