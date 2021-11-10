import { createRouter, createWebHashHistory, createWebHistory } from "./lib/my-router";
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'


export default createRouter({
    mode: createWebHashHistory(),
    routes: [
        {
            path: '',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
})