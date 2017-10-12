<template>
  <div>
    <getPrice></getPrice>
  </div>
</template>
<script type="text/ecmascript-6">
  //import Common from "../../base/appendCommon/appendCommon.vue"
  import Success from "../task/submitSuccess.vue"
   import GetPrice from "../task/taskTwo/taskTwo_step1.vue"
export default {
  name: "youpin",
  data () {
    return {
//      goodsObj: {
//        shopName: 'abcd旗舰店',
//        goodsName: 'BeoPlay P2 Bo蓝牙音箱迷你效益你想',
//        temp: "任意规格",
//        num: '1件',
//        price: '999.00',
//        orderNum: '999999999999999999999'
//      }

    }
  },
  components: {
    //Common
     GetPrice
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
