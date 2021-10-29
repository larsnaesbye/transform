<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from '@/components/shared/header/Header'
import Footer from '@/components/shared/footer/Footer'
import { isIE, isConsole, isWearable, isSmartTV, isMobile } from 'mobile-device-detect'

export default {
  name: 'App',
  components: { Header, Footer },
  created () {
    const self = this
    if (isIE) {
      self.$router.push({ path: '/PageBrowserIncompatible' })
    }
    if (isConsole || isWearable || isSmartTV) {
      self.$router.push({ path: '/PageDeviceIncompatible' })
    }
    if (isMobile) {
      self.$router.push({ path: '/PageMobileIncompatible' })
    }
  }
}
</script>

<style>
:root, html, body {
  height: 100%;
  margin: 0;
}

main {
  padding: 0;
}
</style>
