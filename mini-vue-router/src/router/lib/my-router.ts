import { createApp, inject, ref, Ref } from "@vue/runtime-dom"
import RouterView from './router-view.vue'
import routerLink from "./router-link.vue"

const ROUTER_KEY = Symbol()

enum Mode {
    webHashHistory,
    webHistory
}

type VComponent = {
    [key: string]: any
}

type RouterHistory = {
    mode: Mode,
    bindEvent: (fn: () => any) => any
}

type RouterRoute = {
    path: string,
    component: VComponent,
    [key: string]: any
}

type RouterOptions = {
    history: RouterHistory,
    routes: RouterRoute[],
    [key: string]: any
}

const emptyRoute: RouterRoute = { path: '', component: {} }

export function createWebHashHistory(): RouterHistory {
    return {
        mode: Mode.webHashHistory,
        bindEvent: fn => fn()
    }
}

export function createWebHistory(): RouterHistory {
    return {
        mode: Mode.webHistory,
        bindEvent: fn => fn
    }
}

class Router {
    mode: Mode;
    currentRoute: Ref<RouterRoute>;
    routes: RouterRoute[];

    constructor(options: RouterOptions) {
        this.mode = options.history.mode;
        this.routes = options.routes;
        if (this.mode === Mode.webHashHistory) {
            this.currentRoute = ref(this.routes.find(route => route.path.slice(1) === window.location.hash.slice(1)) || emptyRoute)
        } else if (this.mode === Mode.webHistory) {
            this.currentRoute = ref(this.routes.find(route => route.path.slice(1) === window.location.pathname.slice(1)) || emptyRoute)
        } else {
            this.currentRoute = ref(emptyRoute)
        }
        const bindEvent = options.history.bindEvent;
        if (this.mode === Mode.webHashHistory) {
            bindEvent(() => {
                window.addEventListener('hashchange', () => {
                    console.log('hashchange')
                    this.currentRoute.value = this.routes.find(route => route.path.slice(1) === window.location.hash.slice(1)) || emptyRoute
                    console.log(this.currentRoute.value.component)
                })
            })
        } else if (this.mode === Mode.webHistory) {
            bindEvent(() => {
                window.addEventListener('popstate', () => {
                    console.log('popstate')
                    this.currentRoute.value = this.routes.find(route => route.path.slice(1) === window.location.pathname.slice(1)) || emptyRoute
                })
            })
        }
    }

    install(app: ReturnType<typeof createApp>) {
        app.provide(ROUTER_KEY, this)
        app.config.globalProperties.$router = this
        app.component('RouterView', RouterView)
        app.component('RouterLink', routerLink)
    }

    public push(path: string) {
        console.log(path)
        if (this.currentRoute.value?.path === path.slice(1)) return
        if (this.mode === Mode.webHashHistory) {
            window.location.hash = '#' + path.slice(1)
        } else if (this.mode === Mode.webHistory) {
            window.history.pushState('', '', path)
            this.currentRoute.value = this.routes.find(route => route.path.slice(1) === path.slice(1)) || emptyRoute
        }
    }

}

export function createRouter(options: RouterOptions) {
    return new Router(options)
}

export function useRouter(): InstanceType<typeof Router> {
    return inject(ROUTER_KEY)! as InstanceType<typeof Router>
}