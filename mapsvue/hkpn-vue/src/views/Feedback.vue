<template>
  <Background />
  <article>
    <header>
      <h1>
        Er der noget du savner?
      </h1>
      <span>Det nye Historiske Kort er på nuværende tidspunkt under udvikling. Hvis du har noget feedback på den nye web applikation kan du bruge nedenstående formular.
        Hvis du vil give os mulighed for at kontakte dig, er du velkommen til at skrive din mail i kommentaren, men det er ikke et krav. Du kan læse mere om hvordan vi behandler persondata <router-link to="https://historiskekort.dk/Persondata"  target="_blank">her.</router-link></span>
    </header>
    <section class="layout-2col_feedback">
      <form
          v-if="!formSent"
        @submit.prevent=""
        name="feedbackForm"
      >
        <h5>Hvad drejer emnet sig om?</h5>
        <label>
          <input type="radio" name="category-feedback[]" value="teknisk fejl">
          Teknisk fejl
        </label>
        <label>
          <input type="radio" name="category-feedback[]" value="ris og ros">
          Mangler på siden
        </label>
        <label>
          <input type="radio" name="category-feedback[]" value="spørgsmål">
          Ris og ros
        </label>
        <label>
          <h5>Skriv din feedback her:</h5>
          <input class="title" name="subject" type="text" placeholder="Emne..."/>
          <textarea class="comment" placeholder="Kommentar..." name="comment"/>
        </label>
        <button
          class="button1"
          @click.prevent="postFeedback"
        >
          <h6 class="white-text">Send</h6>
        </button>
      </form>
      <article
        v-else-if="formSent"
        class="feedback-submitted">
        <h2>Vi har modtaget din henvendelse. Tak for din feedback!</h2>
      </article>
      <aside class="item2">
        <h2>{{ knownIssues.title }}</h2>
        <span>Sidst opdateret: {{ knownIssues.updated }}</span>
        <p v-html="knownIssues.content"></p>
      </aside>
    </section>
  </article>
</template>

<script>
import Background from '@/components/shared/HeaderBackground'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'Feedback',
  components: { Background },
  setup () {
    const store = useStore()
    const formSent = ref(false)
    const knownIssues = ref({})
    store.dispatch('KnownIssues/clear')
    store.dispatch('KnownIssues/get').then(() => {
      knownIssues.value = store.state.KnownIssues.data
      console.log(knownIssues.value)
    })
    const postFeedback = () => {
      const tmpForm = document.feedbackForm.elements
      const hest = {
        category: tmpForm['category-feedback[]'].value || '',
        subject: tmpForm.subject.value || '',
        comment: tmpForm.comment.value || ''
      }
      store.dispatch('FeedbackSubmit/post', hest).then(() => {
        formSent.value = !formSent.value
      })
    }
    return {
      postFeedback,
      formSent,
      knownIssues
    }
  }
}
</script>

<style scoped>
article {
  border-bottom: 1px solid var(--action);
}
.button1 {
  padding: 0.5vh 1vw;
  border-radius: 20px;
  text-align:center;
  transition: all 0.2s;
  background-color: var(--darkTurquoise);
}
.button1:hover{
  color: var(--white);
  background-color: var(--action);
}

form {
  padding: 1vh 2.5vw 2.5vh 5vw;
  margin: 0;
}
aside {
  padding: 2.5vh 5vw 0 2.5vw;
}
header {
  width: 100%;
  border-bottom: 1px solid var(--action);
  padding: 3.5vh 5vw;
}
form p {
  color: var(--turquoise);
}
label {
  margin: 0 2.5vw 0 0;
}
form h5 {
  padding: 1vh 0;
  margin-top: 2.5vh;
}
.comment {
  min-height: 10rem;
}
.title, .comment, .contact {
  width: 100%;
  border-radius: 15px;
  margin: 0 0 1vh 0;
}
.feedback-submitted {
  padding: 2.5vh 5vw 2.5vh 5vw;
}
</style>
