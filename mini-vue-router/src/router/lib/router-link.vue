<template>
    <button @click="goto">{{ to.slice(1) }}</button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        goto() {
            (this as any).$router.push(this.to)
        }
    }
})


</script>