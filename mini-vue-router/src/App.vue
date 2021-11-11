<template>
  <button @click="useTo('/home')">to home</button>
  <button @click="routerTo('/about')">to about</button>
  <router-link to="/card"></router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { getCurrentInstance } from "@vue/runtime-core"
import { useRouter } from "./router/lib/my-router"

export default ({
  setup() {
    const router = useRouter()
    const $router = (getCurrentInstance()?.proxy as any).$router
    return {
      useTo: (path: string) => {
        router.push(path)
      },
      routerTo: (path: string) => {
        $router.push(path)
      }
    }
  },
})
</script>