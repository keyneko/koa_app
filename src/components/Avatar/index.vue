<template lang="pug">
.avatar-wrapper(:class="{ off: false }")
  img(:src='avatar' :style="{ width: size, height: size }")
</template>

<script setup>
import { toRef } from 'vue'
import store from '@/store'

const props = defineProps({
  size: {
    type: String,
    default: '40px',
  },
})

const avatar = toRef(store.getters, 'avatar')
const name = toRef(store.getters, 'name')
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  position: relative;
  border-radius: 50%;
  border: 3px solid #00ff7a;
  overflow: hidden;

  img {
    display: block;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background: #eaeaea;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }

  &.off {
    filter: grayscale(1);
    border-color: #fff;
  }
}
</style>
