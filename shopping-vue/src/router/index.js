import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BackOffice from '../views/BackOffice.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import AutoLogout from '../components/AutoLogout.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/backOffice',
    name: 'backOffice',
    component: BackOffice,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/auto-logout',
    name: 'auto-logout',
    component: AutoLogout,
    meta: { requiresAuth: true },
  },
  // Outras rotas da sua aplicação
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Defina uma guarda de rota global para verificar se o usuário está logado
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verifique se o usuário está autenticado no localStorage
    const userIsLoggedIn = localStorage.getItem('userIsLoggedIn') === 'true';

    if (userIsLoggedIn) {
      next();
    } else {
      // Redirecione para a página de login e salve a rota original
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
