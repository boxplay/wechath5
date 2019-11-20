import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Collect from '@/components/Collect'
import Tips from '@/components/Tips'
Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/collect',
      name:'Collect',
      component: Collect
    },
    {
      path:'/tips',
      name:'Tips',
      component: Tips
    }
  ]
})
