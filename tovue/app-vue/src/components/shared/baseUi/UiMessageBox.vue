<template>
  <div v-if="showMessage" class="message-box">
    <section>
      <div class="message">{{ message }}</div>
    </section>
    <section>
      <button @click="closeMessage" class="buttonmaster">
        <span>
          {{ buttonLabel }}
        </span>
      </button>
      <label :for="crossSessionId">
        <input type="checkbox" :id="crossSessionId" v-model="storedState">
        Vis ikke igen
      </label>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    crossSessionId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    buttonLabel: {
      type: String,
      default: 'luk'
    }
  },
  data () {
    return {
      showMessage: true,
      storedState: false
    }
  },
  mounted () {
    if (localStorage[this.crossSessionId] && localStorage[this.crossSessionId] === 'hidden') {
      this.showMessage = false
      this.$emit('close')
    } else {
      this.showMessage = true
    }
  },
  methods: {
    closeMessage () {
      if (this.storedState) {
        this.hideForever()
      }
      this.showMessage = false
      this.$emit('close')
    },
    localStorageAvailable () {
      if (typeof (Storage) !== 'undefined') {
        return true
      } else {
        return false
      }
    },
    hideForever () {
      if (this.localStorageAvailable()) {
        localStorage[this.crossSessionId] = 'hidden'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.message-box
  margin 0 0 2rem
  padding 0
  border-radius 8px
  overflow hidden
  box-sizing content-box
  border 4px solid var(--warning)
  background-color var(--white)

section
  padding 1rem 1rem 0rem
  &:last-child
    padding 1rem

.message
  color var(--black)

button
  margin-bottom 0
  margin-right 1rem

label
  // float right
</style>
