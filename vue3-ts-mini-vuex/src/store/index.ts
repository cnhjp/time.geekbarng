import { createStore } from "./lib/my-vuex";

export default createStore({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count++
        }
    }
})