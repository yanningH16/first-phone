<template>
  <div>
    <binsert></binsert>
  </div>
</template>
<script type="text/ecmascript-6">
  import Binsert from '../../base/bottom_insert/binsert.vue'
export default {
  name: "rushou",
  components: {
    Binsert
  },
  data () {
    return {
      demo07_index: 0,
    }
  },
  methods:{
    demo07_onIndexChange (index) {
      this.demo07_index = index
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
