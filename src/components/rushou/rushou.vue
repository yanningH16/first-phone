<template>
  <div>
    <task></task>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Swiper } from 'vux'
  import Task from "../task/taskFive/taskFiveStep1.vue"
export default {
  name: "rushou",
  components: {
    Swiper,
    Task
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
