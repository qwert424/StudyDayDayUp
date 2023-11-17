import { asyncPage } from '../util/index.js';

const Home = asyncPage('../views/home/index.vue')
const other = asyncPage('../views/other/index.vue')

export default [
    { path: '/', component: Home }, { path: '/other', component: other },
]