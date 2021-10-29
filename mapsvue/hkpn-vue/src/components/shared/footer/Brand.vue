<template>
  <section>
    <article class="brand">
      <Icon
          icon="SDFElogo"
          :width="5"
          :height="5"
          :color="colors.black"
          class="brand-logo"
      />
      <div>
        <h5>
          Historiske Kort
        </h5>
        <a>
          En del af:
        </a>
        <span>
          Styrelsen for
          <br>
          Dataforsyning og
          <br>
          Effektivisering
        </span>
      </div>
    </article>
    <article
        class="copyright"
    >
      <p>
        <span>Bemærk:</span>
        Sender du os en e-mail, vil oplysningerne blive registreret i vores centrale, digitale system til videre sagsbehandling.
      </p>
      <p>
        &#169; 2020-2021 Styrelsen for Dataforsyning og Effektivisering
      </p>
    </article>
  </section>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Brand',
  setup () {
    const colors = inject('themeColors')
    return {
      colors
    }
  }
}
</script>

<style scoped>
section {
  background-color: var(--otherSteel);
  padding: 3.5vw 5vw 10rem 5vw;
  grid-row-gap: 0;
}

article {
  grid-column: 1 / -1;
  display: flex;
}

.brand {
  flex-direction: row;
  padding-bottom: 3.5vw;
  align-items: center;
}

.brand-logo {
  margin-top: 1rem;
}

div {
  display: flex;
  flex-direction: column;
  margin-left: 0.4rem;
}

h5 {
  margin-bottom: 0;
}

a {
  font-style: italic;
  font-size: 0.875rem;
  line-height: 1.125rem;
  text-transform: lowercase;
}

div span::before {
  content: "\A";
  white-space: pre;
}

.copyright {
  flex-direction: column;
  border-top: 1.5px solid var(--darkSteel);
}

p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.125rem;
  padding-left: 1rem;
}

p:first-of-type {
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
}

p span {
  font-weight: bold;
}
</style>
