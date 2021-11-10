<template>
    <component v-is="comp"></component>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useRouter, MyRouter, RouterRoute } from './my-router';

const router: InstanceType<typeof MyRouter> = useRouter();

const comp = computed(() => (router.currentRoute.value as RouterRoute).component || null)
</script>