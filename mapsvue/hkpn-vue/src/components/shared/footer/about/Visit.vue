<template>
  <article>
    <h2>Besøg også</h2>
    <ul>
      <li>
        <a href="https://kefm.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Klima-, Energi- og Forsyningsministeriet
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.dmi.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Danmarks Meteorologiske Institut
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.gst.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Geodatastyrelsen
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.ens.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Energistyrelsen
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.geus.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            De Nationale Geologiske Undersøgelser for Danmark og Grønland
          </span>
        </a>
      </li>
      <li>
        <a href="https://forsyningstilsynet.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Forsyningstilsynet
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.energinet.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Energinet
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.klimaraadet.dk">
          <Icon
              icon="MoreIcon"
              :width="1.5"
              :height="1.5"
              :color="colors.black"
          />
          <span>
            Klimarådet
          </span>
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'Visit',
  setup () {
    const colors = inject('themeColors')
    return {
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

h2 {
  padding-left: 1rem;
  border-bottom: 1px solid var(--darkSteel);
  padding-bottom: 0.8rem;
  margin-bottom: 0.6rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
}

li {
  font-size: 0.875rem;
  line-height: 1.125rem;
  margin-bottom: 0.125rem;
}

li a {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

span {
  margin-left: 0.5rem;
}

svg {
  align-self: center;
  flex-shrink: 0;
}
</style>
