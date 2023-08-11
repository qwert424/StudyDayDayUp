import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import VipNews from '../views/VipNews.vue';
import User from '../views/User.vue';
import Loading from '../views/Loading.vue';

export default [
  { name: "Home", path: '/', component: Home, },
  { name: "Login", path: '/login', component: Login },
  { name: "VipNews", path: '/VipNews', component: VipNews, meta: { auth: true } },
  { name: "User", path: '/User', component: User, meta: { auth: true } },
  { name: "Loading", path: '/Loading', component: Loading },
];
