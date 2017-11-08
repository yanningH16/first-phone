<template>
  <div ref="wrapper">
    <div ref="wrapperContainer">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll'
export default {
  name: "slider",
  props: {
    arr: {
      type: Array,
      default: []
    },
    defaultWidth: {
      type: Number,
      default: 0
    },
    defaultMargin: {
      type: Number,
      default: 0
    },
    defaultUnit:{
      type:String,
      default:'px'
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPicsScroll() {
      if (this.arr) {
        let picWidth = this.defaultWidth
        let margin = this.defaultMargin
        let width = (picWidth + margin) * this.arr.length - margin
        this.$refs.wrapperContainer.style.width = width + this.defaultUnit
        this.wrapper = new Bscroll(this.$refs.wrapper, {
          scrollX: true,
          eventPassthrough: 'vertical',
          scrollbar: false
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
      this._initPicsScroll()
    })
  },
  watch: {
    arr() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPicsScroll()
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>