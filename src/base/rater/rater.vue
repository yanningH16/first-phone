<template>
    <div>
      <group title="商家评价">
        <cell title="set default score = 5">
          <rater v-model="data3" slot="value"></rater>
        </cell>
        <cell title="change color">
          <rater v-model="data3" slot="value" :max="6" active-color="red"></rater>
        </cell>
        <cell title="loving">
          <rater v-model="data4" slot="value" star="+" active-color="red" :margin="5"></rater>
        </cell>
      </group>
    </div>
</template>
<script type="text/ecmascript-6">
  import { Rater, Group, Cell } from 'vux'
    export default {
        name: "Star",
        components: {
          Rater,
          Group,
          Cell
        },
        data() {
            return {
              data3: 4,
              data4: 3
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
