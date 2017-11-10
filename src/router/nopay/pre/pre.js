 /* 预评价模块 */
 const PreOnlyFiveStar = (resolve) => {
   import('@/components/preEvaluate/onlyFiveStar').then((module) => {
     resolve(module)
   })
 }
 const PreImgKey = (resolve) => {
   import('@/components/preEvaluate/imgKey').then((module) => {
     resolve(module)
   })
 }
 const PreOnlyText = (resolve) => {
   import('@/components/preEvaluate/onlyText').then((module) => {
     resolve(module)
   })
 }
 const PreTextImg = (resolve) => {
   import('@/components/preEvaluate/textImg').then((module) => {
     resolve(module)
   })
 }
 const PreTextKey = (resolve) => {
   import('@/components/preEvaluate/textKey').then((module) => {
     resolve(module)
   })
 }
 const pre = [{ // 预评价图+关键字
   path: '/prEvaluate/imgKey',
   component: PreImgKey,
   name: 'preImgKey',
   meta: { title: '预评价', isLogin: true }
 },
 { // 预评价全五星
   path: '/prEvaluate/onlyFiveStar',
   component: PreOnlyFiveStar,
   name: 'preOnlyFiveStar',
   meta: { title: '预评价', isLogin: true }
 },
 { // 预评价纯文字
   path: '/prEvaluate/onlyText',
   component: PreOnlyText,
   name: 'preOnlyText',
   meta: { title: '预评价', isLogin: true }
 },
 { // 预评价图文
   path: '/prEvaluate/textImg',
   component: PreTextImg,
   name: 'preTextImg',
   meta: { title: '预评价', isLogin: true }
 },
 { // 预评价文字+关键字
   path: '/prEvaluate/textKey',
   component: PreTextKey,
   name: 'preTextKey',
   meta: { title: '预评价', isLogin: true }
 }
 ]
 export default pre
