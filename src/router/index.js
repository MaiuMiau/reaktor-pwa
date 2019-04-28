import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Emissions from '@/components/Emissions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Emissions',
      component: Emissions
    }
  ]
})
