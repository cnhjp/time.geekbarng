import { createRouter, createWebHashHistory, createWebHistory } from "./lib/my-router";
import Home from '@/views/home/index.vue'
import About from '@/views/about/index.tsx'
import Card from '@/views/card/index.vue'


export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/card',
            component: Card
        }
    ]
})