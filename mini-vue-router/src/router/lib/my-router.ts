import { ref, inject, Ref, createApp } from 'vue'
import RouterLink from './RouterLink';
import RouterView from './RouterView.vue'

const ROUTER_KEY = Symbol('ROUTER_KEY');

export enum Mode {
    WebHashHistory,
    WebHistory,
}

type FnAny = (key: any) => any;

export function createWebHashHistory(): Mode.WebHashHistory {
    return Mode.WebHashHistory
}
createWebHashHistory.bindEvent = (fn: FnAny) => {
    window.addEventListener('hashchange', fn)
}

export function createWebHistory(): Mode.WebHistory {
    return Mode.WebHistory
}
createWebHistory.bindEvent = (fn: FnAny) => {
    window.addEventListener('popstate', fn)
}

export type VElement = {
    [key: string]: any
}

export type Router = {
    routes: RouterRoute[],
    currentRoute: RouterRoute,
    mode: Mode,
    push: (url: string) => void,
    back: () => void,
}

export type RouterOptions = {
    routes: RouterRoute[],
    mode: Mode,
    [key: string]: any,
}

export type RouterRoute = {
    path: string,
    component: VElement,
    [key: string]: any,
}


export class MyRouter {
    routes: RouterRoute[];
    mode: Mode;
    currentRoute: Ref<RouterRoute | null>;

    constructor(options: RouterOptions) {
        this.routes = options.routes
        this.mode = options.mode
        this.currentRoute = ref(null)
        const route = this.routes.find(item => item.path === '' || item.path === '/')
        if (route) this.currentRoute.value = route
        if (this.mode === Mode.WebHashHistory) {
            createWebHashHistory.bindEvent(() => {

            })
        } else if (this.mode === Mode.WebHistory) {
            createWebHistory.bindEvent(() => {

            })
        }
    }

    push(url: string) {

    }

    back() {

    }

    install(app: ReturnType<typeof createApp>) {
        app.provide(ROUTER_KEY, this)
        app.component('RouterLink', RouterLink)
        app.component('RouterView', RouterView)
    }
}

export const useRouter = (): InstanceType<typeof MyRouter> => inject(ROUTER_KEY) as InstanceType<typeof MyRouter>
export const createRouter = (options: RouterOptions) => new RouterLink(options)