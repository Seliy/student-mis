import Vue from 'vue'
import Router from 'vue-router'
import studentmis from '@/components/studentmis'
import student from '@/components/student'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'studentmis',
      component: studentmis
    },
    {
      path:'/student',
      name:'/student',
      component: student
    }
  ]
})
