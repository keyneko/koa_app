<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cached">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.path
    },
    cached() {
      return this.$store.getters.cached || []
    },
  },
}
</script>
