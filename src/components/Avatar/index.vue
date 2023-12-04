<template lang="pug">
div: router-link(to='/settings')
  .avatar-wrapper(:class="{ off: false }")
    img(:src='avatar')
</template>

<script setup>
import { toRef } from 'vue'
import store from '@/store'

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
