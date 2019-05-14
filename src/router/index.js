import Vue from 'vue'
import Router from 'vue-router'
import Chart from '@/components/Chart'
import Form from '@/components/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    },
    {
      path: '/emissionschart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
  mode: 'history',
});
