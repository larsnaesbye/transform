<template>
  <article>
    <h6
        class="h6_caption"
    >
      Meddelelser
    </h6>
    <a :href="message.link" target="_blank" class="row" v-for="message in messages" :key="message.link">
      <Icon
          :icon="message.icon"
          :width="3"
          :height="3"
          :strokeWidth="1"
          :color="message.iconColor"
      />
      <div class="row-content-wrapper">
        <div class="row-content">
          <p span="paragraph_lille"><span class="row-content__title">{{message.title}}</span> <span class="italic">{{message.subTitle}}</span> <span class="italic" v-html="message.post"/></p>
        </div>
        <div class="row-footer">
          <Icon
              icon="ExpandIcon"
              :width="2"
              :height="2"
              :strokeWidth="1"
              :color="colors.black"
          />
        </div>
      </div>
    </a>
  </article>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Messages',
  setup () {
    const colors = inject('themeColors')

    return {
      messages: [
        {
          title: 'DATAFORSYNINGEN',
          subTitle: '@dataforsyningen',
          post: '',
          link: 'https://twitter.com/dataforsyningen',
          icon: 'TwitterIcon',
          iconColor: colors.twitter
        },
        {
          title: 'DRIFT',
          subTitle: '@DriftDataforsyn',
          post: '',
          link: 'https://twitter.com/DriftDataforsyn',
          icon: 'DriftIcon',
          iconColor: colors.turquoise
        }
        // {
        //   title: '',
        //   subTitle: '',
        //   post: 'Vi kan kun vise dig denne twitterbesked, hvis du accepterer alle cookies. <br/><br/><span style="color:' + colors.highlight + '">Ret cookie-indstillinger</span>',
        //   link: 'http://twitter',
        //   icon: 'TwitterIcon',
        //   iconColor: colors.white
        // }
      ],

      colors
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
  flex-direction: column;
}

a {
  padding-left: 1rem;
  margin-bottom: 1rem;
}

h6 {
  padding-left: 1rem;
  border-bottom: 1px solid var(--darkSteel);
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
}

p {
  margin: 0;
}

.row {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--darkSteel);
}

.row-content-wrapper {
  padding: 0 1rem;
  width: 100%;
}

.row-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.row-footer > *:last-child {
  margin-left: auto;
}

.row-content__title {
  color: var(--turquoise);
  font-weight: 500;
}

.italic {
  font-style: italic;
}

</style>
