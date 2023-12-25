<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cached">
        <router-view :key="$route.path" />
      </keep-alive>
    </transition>
  </div>
</template>

<script setup>
import { toRef, watch } from 'vue'
import store from '@/store'
import '@/utils/cacheMaps'
import { socket, initSocket, closeSocket } from '@/utils/socket'

const cached = toRef(store.state.app, 'cached')
const rcount = toRef(store.state.route, 'rcount')
const archive = toRef(store.state.route, 'archive')
const token = toRef(store.state.user, 'token')

watch(
  token,
  (value) => {
    if (value) {
      initSocket()

      setTimeout(() => {
        socket.emit('joinRoom', 'room1')
      }, 5000)
    }
    else {
      closeSocket()
    }
  },
  { immediate: true }
)
</script>
