 /*追评模块*/
 const AppendToTaoBao1 = (resolve) => {
   import ('@/components/append/toTaoBao1').then((module) => {
     resolve(module)
   })
 }
 const AppendToTaoBao2 = (resolve) => {
   import ('@/components/append/toTaoBao2').then((module) => {
     resolve(module)
   })
 }
 const append = [{ //评论到淘宝
     path: '/append/toTaoBao1',
     component: AppendToTaoBao1,
     name: 'appendToTaoBao1',
     meta: { title: '追评到淘宝', isLogin: true }
   },
   { //评论到淘宝
     path: '/append/toTaoBao2',
     component: AppendToTaoBao2,
     name: 'appendToTaoBao2',
     meta: { title: '追评到淘宝', isLogin: true }
   }
 ]
 export default append