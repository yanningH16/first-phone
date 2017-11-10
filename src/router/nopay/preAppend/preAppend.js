  /* 预追评模块 */
  const PreAppendOnlyText = (resolve) => {
    import('@/components/preAppend/onlyText').then((module) => {
      resolve(module)
    })
  }
  const PreAppendOnlyTextKey = (resolve) => {
    import('@/components/preAppend/onlyTextKey').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextFav1 = (resolve) => {
    import('@/components/preAppend/textFav1').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextFav2 = (resolve) => {
    import('@/components/preAppend/textFav2').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextFavKey1 = (resolve) => {
    import('@/components/preAppend/textFavKey1').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextFavKey2 = (resolve) => {
    import('@/components/preAppend/textFavKey2').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextImg = (resolve) => {
    import('@/components/preAppend/textImg').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextImgFav1 = (resolve) => {
    import('@/components/preAppend/textImgFav1').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextImgFav2 = (resolve) => {
    import('@/components/preAppend/textImgFav2').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextKeyImg = (resolve) => {
    import('@/components/preAppend/textKeyImg').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextKeyImgFav1 = (resolve) => {
    import('@/components/preAppend/textKeyImgFav1').then((module) => {
      resolve(module)
    })
  }
  const PreAppendTextKeyImgFav2 = (resolve) => {
    import('@/components/preAppend/textKeyImgFav2').then((module) => {
      resolve(module)
    })
  }
  const preAppend = [{ // 预追评纯文字
    path: '/preAppend/onlyText',
    component: PreAppendOnlyText,
    name: 'preAppendOnlyText',
    meta: { title: '预追评', isLogin: true }
  },
  { // 预追评文字+关键字
    path: '/preAppend/onlyTextKey',
    component: PreAppendOnlyTextKey,
    name: 'preAppendOnlyTextKey',
    meta: { title: '预追评', isLogin: true }
  },
  { // 预追评文字+收藏
    path: '/preAppend/textFav1',
    component: PreAppendTextFav1,
    name: 'preAppendTextFav1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { // 预追评文字+收藏
    path: '/preAppend/textFav2',
    component: PreAppendTextFav2,
    name: 'preAppendTextFav2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { // 预追评文字+关键字+收藏
    path: '/preAppend/textFavKey1',
    component: PreAppendTextFavKey1,
    name: 'preAppendTextFavKey1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { // 预追评文字+关键字+收藏
    path: '/preAppend/textFavKey2',
    component: PreAppendTextFavKey2,
    name: 'preAppendTextFavKey2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { // 预追评图文
    path: '/preAppend/textImg',
    component: PreAppendTextImg,
    name: 'preAppendTextImg',
    meta: { title: '预追评', isLogin: true }
  },
  { // 预追评图文+收藏
    path: '/preAppend/textImgFav1',
    component: PreAppendTextImgFav1,
    name: 'preAppendTextImgFav1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { // 预追评图文+收藏
    path: '/preAppend/textImgFav2',
    component: PreAppendTextImgFav2,
    name: 'preAppendTextImgFav2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { // 预追评图文+关键字
    path: '/preAppend/textKeyImg',
    component: PreAppendTextKeyImg,
    name: 'preAppendTextKeyImg',
    meta: { title: '预追评', isLogin: true }
  },
  { // 预追评图文+关键字+收藏
    path: '/preAppend/textKeyImgFav1',
    component: PreAppendTextKeyImgFav1,
    name: 'preAppendTextKeyImgFav1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { // 预追评图文+关键字+收藏
    path: '/preAppend/textKeyImgFav2',
    component: PreAppendTextKeyImgFav2,
    name: 'preAppendTextKeyImgFav2',
    meta: { title: '预追评(2/2)', isLogin: true }
  }
  ]
  export default preAppend
