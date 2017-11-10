<template>
  <div class='finish_room'>
    <div class='finish_room2'>
      <div v-for='(item ,index ) in imgs' class='room_img' :key="index">
        <img :src="item">
        <span @click='delete_img(index)' class="removeImg"><img src="./imgs/delete.png" ref="deleteBox"></span>
      </div>
      <div class='room_add_img' v-show="isMax">
        <span><img src="./imgs/add_img.png"></span>
        <span v-if="isShow">{{ imgs.length + 1 }} / {{ max }}</span>
        <input @change='add_img' type="file" ref="chooseImg">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Alert, md5, Icon } from 'vux'
export default {
  name: 'Uploader',
  components: {
    Alert,
    Icon
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    myimgs: {
      type: Array,
      default: () => {
        return []
      }
    },
    max: {
      type: Number,
      default: 3
    },
    showNum: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imgs: [],
      isMax: true,
      lastImg: [],
      uploadImgs: []
    }
  },
  mounted () {
    this.imgs = this.myimgs
  },
  watch: {
    imgs (newVal) {
      if (newVal.length === this.max) {
        this.isMax = false
      }
      this.$emit('upload-change', newVal)
    },
    myimgs (newVal) {
      this.imgs = newVal
    }
  },
  methods: {
    delete_img (item) {
      this.$refs.chooseImg.value = '' // 修复upload删除之后无法选取上一个
      this.imgs.splice(item, 1)
      if (this.imgs.length < this.max) {
        this.isMax = true
      }
    },
    add_img (event) {
      let reader = new FileReader()
      console.log(reader)
      let img1 = event.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(img1.name)) {
        this.$vux.alert.show({
          title: '错误提示',
          content: '图片格式只能为gif，jpg，jpeg，png'
        })
        return false
      }
      // if (this.lastImg.indexOf(img1.name) !== -1) {
      //   this.$vux.alert.show({
      //     title: '错误提示',
      //     content: '图片不能重复上传',
      //   })
      // } else {

      // }
      this.lastImg.push(img1.name)
      let picName = img1.lastModified + md5(img1.name)
      this.getClient(img1, picName)
    },
    // 获得上传参数
    getClient (file, picName) {
      this.$axios.get('/api/picManage/getStsInfo').then((response) => {
        console.log(response.data.code === '200')
        if (response.data.code === '200') {
          this.uploadFile(response.data.data, file, picName)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: '上传失败'
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误'
        })
        console.log('error:' + error)
      })
    },
    // 上传图片
    uploadFile (data, file, name) {
      let _this = this
      var OSS = window.OSS.Wrapper
      var client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        stsToken: data.securityToken,
        bucket: 'baoyitech'
      })
      console.log(name, file)
      return client.multipartUpload(name, file).then((res) => {
        if (_this.imgs.length > _this.max - 1) {
          _this.$vux.alert.show({
            title: '提示',
            content: '最多添加' + _this.max + '张图片'
          })
        } else {
          _this.imgs.push(`http://baoyitech.oss-cn-hangzhou.aliyuncs.com/${res.name}`)
          if (_this.imgs.length > _this.max - 1) {
            _this.isMax = false
          }
        }
      }).catch(() => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误'
        })
      })
    }
  }
}
</script>
<style scoped>
.finish_room {
  width: 100%;
}

.finish_room2 {
  height: auto;
  /* padding: 1.2rem; */
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.finish_room2 .room_img {
  width: 5.8rem;
  height: 5.8rem;
  margin-right: 1.2rem;
  margin-bottom: 1.2rem;
  position: relative;
  /*overflow: hidden;*/
}

.finish_room2 .room_img img {
  width: 100%;
  height: 100%;
}

.finish_room2 > .room_img span {
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: -1rem;
  top: -1rem;
}

.room_add_img {
  width: 5.8rem;
  height: 5.8rem;
  margin-right: 1.2rem;
  margin-bottom: 1.2rem;
  border: 1px solid #e1e1e1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  justify-content: center;
}

.room_add_img > span > img {
  width: 100%;
  height: 100%;
}

.room_add_img > span:nth-child(1) {
  flex: 0 0 2.8rem;
  width: 2.8rem;
  height: 2.8rem;
  overflow: hidden;
}

.room_add_img > span:nth-child(2) {
  flex: 0 0 1rem;
  margin-top: 0.5rem;
  color: gray;
  font-size: 1rem;
}

.room_add_img input {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99999;
  opacity: 0;
}
</style>
