export default [{
    path: "/",
    component: () => import("../view/index.vue")
}, {
    path: "/login",
    component: () => import("../view/login.vue")
}]