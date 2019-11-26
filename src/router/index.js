import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Collect from '@/components/Collect'
import Tips from '@/components/Tips'
import Someet from '@/components/Someet'
Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Someet',
      component: Someet
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
