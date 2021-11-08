import { reactive, ref, Ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { createApp } from "@vue/runtime-dom";
const STORE_KEY = Symbol('STORE_KEY')

type State = { [key: string]: any };
type Mutations = { [key: string]: (...args: any) => any };

type Options = {
    state: State,
    mutations: Mutations
}

class MyStore {
    _state: Ref<State>;
    _mutations: Mutations;
    constructor(options: Options) {
        this._state = ref(options.state);
        this._mutations = options.mutations;
    }

    get state(): State {
        return this._state.value
    }

    commit(type: string, payload?: any) {
        const entry = this._mutations[type]
        entry && entry(this._state.value, payload)
    }

    install(app: ReturnType<typeof createApp>) {
        app.provide(STORE_KEY, this)
        app.config.globalProperties.$store = this
    }

}

export function useStore(): InstanceType<typeof MyStore> {
    return inject(STORE_KEY) as InstanceType<typeof MyStore>
}

export function createStore(options: Options): InstanceType<typeof MyStore> {
    return new MyStore(options);
}