import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import ForgetPassword from '@/components/ForgetPassword'
import ResetPassword from '@/components/ResetPassword'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path : "/forget-password",
      name : ForgetPassword,
      component:ForgetPassword
    },

    {
      path : "/forget-password/:userId/:codeId",
      name : ResetPassword,
      component:ResetPassword
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    }
  ]
})
