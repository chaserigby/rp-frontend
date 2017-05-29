import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Copyright from '@/components/Copyright'
import Privacy from '@/components/Privacy'
import Team from '@/components/Team'
import Terms from '@/components/Terms'
import UserProfile from '@/components/UserProfile'
import UserEdit from '@/components/UserEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/copyright',
      name: 'Copyright',
      component: Copyright
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/useredit',
      name: 'UserEdit',
      component: UserEdit
    }
  ]
})