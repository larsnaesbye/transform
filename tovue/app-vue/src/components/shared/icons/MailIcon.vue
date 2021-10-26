<template>
  <svg :width="width" :height="height" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      v-if="border"
      cx="24" cy="24" r="23.5"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="1"
    />
    <path
      :stroke="color"
      :stroke-width="strokeWidth * .5"
      d="M13 14.5H35V13.5H13V14.5ZM37.5 17V31H38.5V17H37.5ZM35 33.5H13V34.5H35V33.5ZM10.5 31V17H9.5V31H10.5ZM13 33.5C11.6193 33.5 10.5 32.3807 10.5 31H9.5C9.5 32.933 11.067 34.5 13 34.5V33.5ZM37.5 31C37.5 32.3807 36.3807 33.5 35 33.5V34.5C36.933 34.5 38.5 32.933 38.5 31H37.5ZM35 14.5C36.3807 14.5 37.5 15.6193 37.5 17H38.5C38.5 15.067 36.933 13.5 35 13.5V14.5ZM13 13.5C11.067 13.5 9.5 15.067 9.5 17H10.5C10.5 15.6193 11.6193 14.5 13 14.5V13.5Z"
      fill="black"
    />
    <path
      :stroke="color"
      :stroke-width="strokeWidth * .5"
      d="M38.2481 18.4341C38.4878 18.2971 38.5711 17.9917 38.4341 17.7519C38.2971 17.5122 37.9917 17.4289 37.7519 17.5659L38.2481 18.4341ZM10.2481 17.5659C10.0083 17.4289 9.70288 17.5122 9.56588 17.7519C9.42887 17.9917 9.51217 18.2971 9.75193 18.4341L10.2481 17.5659ZM25.4884 25.1495L25.2403 24.7154L25.2403 24.7154L25.4884 25.1495ZM22.5116 25.1495L22.7597 24.7154L22.7597 24.7154L22.5116 25.1495ZM37.7519 17.5659L25.2403 24.7154L25.7365 25.5836L38.2481 18.4341L37.7519 17.5659ZM22.7597 24.7154L10.2481 17.5659L9.75193 18.4341L22.2635 25.5836L22.7597 24.7154ZM25.2403 24.7154C24.4718 25.1545 23.5282 25.1545 22.7597 24.7154L22.2635 25.5836C23.3395 26.1985 24.6605 26.1985 25.7365 25.5836L25.2403 24.7154Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  name: 'MailIcon',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: [Number, String],
      default: 1
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    }
  }
}
</script>
