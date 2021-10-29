<template>
  <nav>
    <h6><router-link to="/About">Om Historiske Kort</router-link></h6>
    <h6><router-link to="/Persondata">Persondata</router-link></h6>
    <h6><router-link to="/CookiePolitik">Cookies</router-link></h6>
    <h6><a href="https://www.was.digst.dk/dataforsyningen-dk">Webtilgængelighed</a></h6>
  </nav>
</template>

<style scoped>
nav {
  height: 4rem;
  padding-top: 1rem;
}
h6 {
  height: 100%;
  display: inline;
  margin: 0;
  text-transform: uppercase;
}
.router-link-active {
  border-top: 3px solid var(--action);
  color: var(--action);
}
a {
  padding: 1rem 1rem;
  color: var(--black);
  width: 100%;
}
</style>
