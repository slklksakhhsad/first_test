import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/components/Login.vue')
  },
  {
    path:'/home',
    component:()=>import('@/components/Home.vue'),
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:()=>import('@/components/Welcome.vue')
      },
      {
        path:'/users',
        component:()=>import('@/components/user/Users.vue')
      }
    ]
  }
]



const router = new VueRouter({
  routes
})


//挂载路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    return next()
  }

  const tokener = window.sessionStorage.getItem('token')

  if(!tokener) {
    return next('/login')
  }
  next()
})

export default router
