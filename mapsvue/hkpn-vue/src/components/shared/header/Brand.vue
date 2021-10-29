<template>
  <router-link @click="clearFilters"
      to="/"
      class="brand"
  >
    <Icon
        :icon="dynamicLogo"
        :width="5"
        :height="5"
        :color="textColorHover"
        class="brand-logo cursor-point"
        :class="{ christmas : (dynamicLogo === 'ChristmasCrownLogo') }"
        @mouseenter.stop="isHovering = true"
        @mouseleave.stop="isHovering = false"
    />
    <div
        class="brand-name"
        @mouseenter.stop="isHovering = true"
        @mouseleave.stop="isHovering = false"
    >
      <h5
          class="cursor-point"
      >
        Historiske Kort
      </h5>
      <span
          class="cursor-point text-small"
      >
        Styrelsen for Dataforsyning og Effektivisering
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Brand',
  data () {
    return {
      isHovering: false
    }
  },

  methods: {
    clearFilters () {
      window.location.replace(window.location.protocol + '//' + window.location.host)
      // this.$store.dispatch('Filters/clear')
    }
  },

  computed: {
    dynamicLogo () {
      // eslint-disable-next-line one-var
      const date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate()
      return ((day === 31) && (month === 10))
        ? 'ScaryPumpkin'
        : ((month === 12) && (day === 24))
            ? 'ChristmasCrownLogo'
            : 'CrownCirclesLogo'
    },
    useBlackColor () {
      return this.$route.meta.textColor && this.$route.meta.textColor === 'black'
    },
    textColor () {
      return this.useBlackColor ? this.$themeColors.white : this.$themeColors.white
    },
    textColorHover () {
      return this.isHovering ? this.$themeColors.action : this.textColor
    }
  }
}
</script>

<style scoped>
.brand {
  display: flex;
  cursor: default;
  grid-column: 1;
}

.brand-logo {
  flex-shrink: 0;
}

.brand-name {
  align-self: flex-start;
  padding-left: 1rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
}

h5 {
  white-space: nowrap;
  word-break: keep-all;
  break-inside: avoid;
  line-break: strict;
  hyphens: none;
  color: var(--white);
}

span {
  word-break: keep-all;
  color: var(--white);
}

.christmas {
  margin-top: -1.9rem;
  width: 120px !important;
  height: 120px !important;
}
</style>
