ww<template lang="pug">
.block.relative
  transition(name='fade' tag='div' enter-active-class='fadeInRight' leave-active-class='fadeOutRight')
    .tip.animated.faster(v-if='showTip') 按PDA的红色按钮扫码

  svg-icon(name='扫码' :width="width" :height="height" viewBox="0 0 480 480")
  .text-center
    slot
      | {{ title }}
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 80,
    },
    height: {
      type: Number,
      default: 80,
    },
    fill: {
      type: String,
      default: '#00ED0F',
    },
    animate: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showTip: false,
    }
  },

  created() {
    this.timerId = setTimeout(() => {
      this.showTip = true

      this.timerId = setTimeout(() => {
        this.showTip = false
      }, 5000)
    }, 3000)
  },

  destroyed() {
    clearTimeout(this.timerId)
  },
}
</script>
<style lang="scss" scoped>
.svg-icon {
  display: block;
  width: auto;
  height: auto;
  margin: auto;
}

.tip {
  color: #fff;
  background: red;
  padding: 0px 12px;
  height: 32px;
  line-height: 32px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;

  position: absolute;
  z-index: 999;
  right: 15px;
  top: 44%;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0px;

    border: 16px solid transparent;
    border-left-color: red;

    position: absolute;
    top: 0;
    right: -31px;
  }
}

.title {
  text-align: center;
  color: #666;
}
</style>
