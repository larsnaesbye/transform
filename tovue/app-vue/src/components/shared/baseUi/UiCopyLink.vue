<template>
  <div class="link-section">
    <p class="paragraph_lille">{{ link || 'no link' }}</p>
    <button
      class="buttonmaster"
      tabindex="0"
      @keydown.enter="clipboard"
    >
      <Icon
        icon="CopyIcon"
        :height="2"
        :width="2"
        :strokeWidth="0.8"
        :color="'black'"
        @click.native="clipboard"
        :tooltipText="tooltipText"
        :showTooltip="showTooltip"
        :id="link"
      />
    </button>
  </div>
</template>

<script>
import { copyToClipboard } from '@/HelperFunctions'

export default {
  props: {
    link: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: 'Kopier til udklipsholder'
    },
    tooltipDone: {
      type: String,
      default: 'Kopieret!'
    }
  },
  data () {
    return {
      showTooltip: false,
      tooltipText: 'Kopier til udklipsholder'
    }
  },
  methods: {
    clipboard () {
      copyToClipboard(this.link).then((result) => {
        this.tooltipText = 'Kopieret!'
        this.showTooltip = true
        window.setTimeout(() => {
          this.showTooltip = false
          this.tooltipText = this.tooltip
        }, 3000)
      })
    }
  },
  mounted () {
    this.tooltipText = this.tooltip
  }
}
</script>

<style lang="stylus" scoped>
.link-section
  display flex
  justify-content space-between
  align-items center

.link-section > *
  flex-grow 0

.link-section:not(:last-child)
  margin-bottom 1rem

button
  margin-left 1rem
  flex-shrink 0
</style>
