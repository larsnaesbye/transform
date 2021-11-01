<template>
    <table class="table data-table">
      <thead class="table-header">
        <tr class="header-row">
          <th
            class="cell"
            v-for="column in columnDefShown"
            :key="column.fieldId"
            :id="`th_${column.fieldId}`"
            ref="headers"
            :class="(column.type === 'num' || column.type === 'pct') ? 'align-right' : ''"
            @click="$emit('sort', column.fieldId)"
          >
            <div class="content">
              <h6>
                {{ column.label }}
              </h6>
              <div
                class="sort-arrows"
                tabindex="0"
                @keydown.enter="$emit('sort', column.fieldId)"
              >
                <span
                  class="sort-arrow-up"
                  :class="(sortId === column.fieldId) && (sortOrders[column.fieldId] > 0) ? 'active' : 'inactive'"
                ></span>
                <span
                  class="sort-arrow-down"
                  :class="(sortId === column.fieldId) && (sortOrders[column.fieldId] < 0) ? 'active' : 'inactive'"
                ></span>
              </div>
              <div
                class="info-icon"
                @click.stop
                >
                <v-popover
                  placement="top"
                  popoverClass="info"
                  trigger="click"
                  :open="showPopover"
                >
                  <button class="buttonmaster sm no-border tooltip-target info-button" aria-label="Mere info om dette felt">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.08631 9.88568C7.09618 9.29881 7.16276 8.83524 7.28607 8.49496C7.40937 8.15467 7.66091 7.7774 8.04069 7.36315L9.00986 6.36449C9.42417 5.89599 9.63132 5.39296 9.63132 4.85541C9.63132 4.33759 9.49568 3.9332 9.22441 3.64223C8.95314 3.34633 8.55857 3.19839 8.04069 3.19839C7.53761 3.19839 7.13317 3.33154 6.82737 3.59785C6.52158 3.86416 6.36868 4.2217 6.36868 4.67048H5C5.00986 3.87155 5.29346 3.22798 5.8508 2.73974C6.41307 2.24658 7.14303 2 8.04069 2C8.97287 2 9.6979 2.25151 10.2158 2.75454C10.7386 3.25263 11 3.93813 11 4.81103C11 5.67406 10.6005 6.52477 9.80148 7.36315L8.99507 8.16207C8.63502 8.56153 8.45499 9.13607 8.45499 9.88568H7.08631ZM7.02713 12.2307C7.02713 12.0087 7.09371 11.8238 7.22688 11.6759C7.36498 11.523 7.5672 11.4465 7.83354 11.4465C8.09988 11.4465 8.3021 11.523 8.4402 11.6759C8.5783 11.8238 8.64735 12.0087 8.64735 12.2307C8.64735 12.4526 8.5783 12.6375 8.4402 12.7855C8.3021 12.9285 8.09988 13 7.83354 13C7.5672 13 7.36498 12.9285 7.22688 12.7855C7.09371 12.6375 7.02713 12.4526 7.02713 12.2307Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <!-- <span class="tooltip-target">?</span> -->
                  <template slot="popover">
                    <button
                      v-close-popover
                      class="close-button button-reset"
                      aria-label="Luk tooltip"
                    >
                      <svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;">
                        <path
                          stroke="#FFF"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.0001 6.99997L7.00004 17M6.99995 6.99997L17 17"
                        />
                      </svg>
                    </button>
                    <h6>{{ column.label }}</h6>
                    <p class="paragraph_lille white-text">
                      {{ column.shortDef || 'Ingen beskrivelse' }}
                    </p>
                    <a v-if="column.shortDef" class="white-text" @click="$emit('open-field-description', column.fieldId)" v-close-popover>Læs mere...</a>
                  </template>
                </v-popover>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="table-body" style="overflow: inherit;" ref="tbody">
        <tr
          v-for="(row, rowIndex) in rowsAndCols"
          :key="`datarow_${rowIndex}`"
          ref="rows" class="row"
          @click="rowClicked(rowIndex)"
          :class="{
            'active' : activeRow === rowIndex
          }"
        >
          <td
            v-for="(col, colIndex) in columnDefShown"
            :key="`${rowIndex}_${colIndex}`"
            class="cell"
            :class="{
              'align-right' : col.type === 'num' || col.type === 'pct'
            }"
            :ref="`row${rowIndex}_fields`"
          >
          {{ formatField(row[colIndex], col.type, col.decimals, col.separator) }}
          {{ col.unit ? col.unit : '' }}
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { formatField } from '@/HelperFunctions'

export default {
  props: {
    datasetId: {
      type: Number,
      reequired: true
    },
    rows: {
      type: Array,
      default: () => []
    },
    columnDef: {
      type: Array,
      default: () => []
    },
    sortOrders: {
      type: Object
    },
    shownColumns: {
      type: Array,
      required: true
    },
    sortId: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean
    }
  },
  data () {
    return {
      defaultColWidth: 50,
      colWidths: [],
      activeRow: -1,
      showPopover: true
    }
  },
  computed: {
    columnDefShown () {
      const arr = []
      this.columnDef.forEach(col => {
        if (this.shownColumns.some(name => name === col.fieldId)) {
          arr.push(col)
        }
      })
      return arr
    },
    rowsAndCols () {
      const twoDimArr = []
      this.rows.forEach(row => {
        const fields = []
        this.columnDefShown.forEach(col => {
          fields.push(row[col.fieldId])
        })
        twoDimArr.push(fields)
      })
      return twoDimArr
    }
  },
  watch: {
    active (val) {
      if (val) {
        setTimeout(() => {
          this.renderColWidths(this.calcColumnWidths())
        }, 500)
      }
    },
    rows () {
      this.activeRow = -1
      this.$nextTick(() => {
        this.renderColWidths(this.calcColumnWidths())
      })
    },
    shownColumns (newVal) {
      this.$nextTick(() => {
        this.renderColWidths(this.calcColumnWidths())
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderColWidths(this.calcColumnWidths())
      this.showPopover = false
    })
  },
  methods: {
    formatField (data, type, decimals, separator) {
      return formatField(data, type, decimals, separator)
    },
    rowClicked (rowIndex) {
      this.activeRow = this.activeRow === rowIndex ? -1 : rowIndex
    },
    calcColumnWidths () {
      const columnDefShown = []
      this.columnDef.forEach(col => {
        if (this.shownColumns.some(name => name === col.fieldId)) {
          columnDefShown.push(col)
        }
      })
      const colWidths = []
      columnDefShown.forEach((col, i) => {
        if (col.defaultWidth) {
          colWidths.push({ id: col.fieldId, width: col.defaultWidth })
        } else {
          const headerEl = this.$refs.headers[i]
          headerEl.style.whiteSpace = 'nowrap'
          headerEl.style.overflow = 'hidden'
          colWidths.push({ id: col.fieldId, width: headerEl.offsetWidth })
          headerEl.querySelector('.content').style.flexShrink = 0
          headerEl.style.whiteSpace = 'normal'
          headerEl.style.overflow = 'visible'
        }
        /* this.$refs.rows.forEach((row, j) => {
          let curCol = colWidths[i]
          let colEl = this.$refs[`row${j}_fields`][i]
          colEl.style.whiteSpace = 'nowrap'
          colEl.style.overflow = 'hidden'
          let w = colEl.scrollWidth
          colEl.style.whiteSpace = 'normal'
          colEl.style.overflow = 'visible'
          colWidths[i] = (w > curCol) ? w : curCol
        }) */
      })
      /* this.columnDefShown.forEach(col => {
        colWidths.push(col.defaultWidth)
      }) */
      return colWidths
    },
    renderColWidths (colWidths) {
      colWidths.forEach((col, i) => {
        const headerEl = document.getElementById(`th_${col.id}`)
        headerEl.style.width = colWidths[i].width + 'px'
        this.$refs.rows.forEach((row, j) => {
          this.$refs[`row${j}_fields`][i].style.width = colWidths[i].width + 'px'
        })
      })
    }
  }
}
</script>

<style lang="stylus">
.table
  table-layout fixed
  overflow visible

.table-header
  white-space nowrap
  vertical-align top
  margin-bottom: 0.5rem

.table-header .header-row
  vertical-align bottom

.table-header .cell .content
  display flex
  align-items center
  text-transform uppercase
  //flex-flow row nowrap
  flex-flow column wrap
  box-sizing border-box
  margin-bottom .5rem
  flex-shrink 1

.table-header .cell h6
  margin 0
  padding-top 2px

tbody
    display block
    overflow auto

tbody tr
    display table-row

tbody td
    display table-column

.row
  white-space nowrap
  overflow visible

.cell
  margin-right 2.5rem
  white-space nowrap
  display inline-flex
  vertical-align top
  white-space normal

.cell > *
  flex-shrink 0

.cell.align-right
  text-align right
  justify-content flex-end

.table-body tr:hover
  background-color var(--lightSteel)

.table-body tr.row.active
  background-color var(--mediumSteel)

.info-icon
  position relative
  margin-left .3rem
  flex-shrink 0
  text-align center
  color grey
  overflow visible
  cursor pointer
  height 20px
  width 20px

.info-icon button
  width 20px

.sort-arrows
  display flex
  flex-flow column nowrap
  margin-left .7rem
  padding: 1px;
  outline none
  width 20px
  height 20px
  padding 5px
  border-radius 50%
  &:focus
    // background var(--action)
    outline none
    box-shadow: 0 0 0 2pt var(--highlight);

span.sort-arrow-up
  width 0
  height 0
  border-left 5px solid transparent
  border-right 5px solid transparent
  border-bottom 5px solid grey

span.sort-arrow-down
  width 0
  height 0
  border-left 5px solid transparent
  border-right 5px solid transparent
  border-top 5px solid grey
  margin-top 2px

span.sort-arrow-down.active
  border-top 5px solid black

span.sort-arrow-up.active
  border-bottom 5px solid black

.tooltip.info
  outline none

.tooltip.info .wrapper
  margin-bottom -10px
  padding-bottom 10px

.info .tooltip-inner
  color white
  padding 1rem
  max-width 250px
  box-sizing border-box
  filter drop-shadow(0 4px 4px var(--lightGrey))
  border-radius 1rem
  background var(--tooltipColor)
  & .close-button
    position absolute
    top .5rem
    right .5rem

.info .tooltip-arrow {
    width 0
    height 0
    border-style solid
    position absolute
    margin 5px
    border-color var(--tooltipColor)
    z-index 1
  }
  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="right"] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^="left"] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
