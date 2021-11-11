<template>
    <component :is="comp"></component>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useRouter } from './my-router';
const router = useRouter()

const comp = computed(() => {
    return router.currentRoute.value.component
})

</script>