<template>
  <ul class="nav">
    <li>
      <router-link to="/feedback">
        <Icon
            icon="MailIcon"
            :width="2.875"
            :height="2.875"
            :color="colors.white"
            class="nav-icon"
        />
        <h6 v-if="window.width > 770">
          Feedback
        </h6>
      </router-link>
    </li>
    <li>
      <router-link to="/news">
        <Icon
            icon="BeskedIcon"
            :width="2.875"
            :height="2.875"
            :color="colors.white"
            class="nav-icon"
        />
        <h6 v-if="window.width > 770">
          Nyheder
        </h6>
      </router-link>
    </li>
    <li>
      <router-link to="/about">
        <Icon
            icon="MapIcon"
            :width="2.875"
            :height="2.875"
            :color="colors.white"
            class="nav-icon"
        />
        <h6 v-if="window.width > 770">
          Om Historiske Kort
        </h6>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Nav',
  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  },
  data () {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style scoped>
.nav {
  margin-top: 1rem;
  padding-left: 1rem;
  display: flex;
  justify-content: flex-end;
}

ul {
  margin: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
}

li, li > a {
  display: flex;
  flex-direction: row;
  align-items: center;
}

li {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.nav-icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  border-color: var(--white);
  z-index: 1;
}

.nav-icon:hover, .hover {
  border-color: var(--teal);
  background-color: var(--action);
}

.nav-icon__black {
  border-color: var(--black);
}

h6 {
  color: var(--white);
  padding-left: 0.3rem;
  white-space: nowrap;
  word-break: keep-all;
  flex-shrink: 0;
}
</style>
