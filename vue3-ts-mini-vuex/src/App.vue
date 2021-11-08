<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "./store/lib/my-vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const plusOne = () => {
      store.commit("add");
    };

    return {
      store,
      plusOne,
    };
  },
  methods: {
    addOne() {
      (this as any).$store.commit("add");
    },
  },
});
</script>


<template>
  <div>
    {{ store.state.count }}
    <button @click="plusOne">+1</button>
    <button @click="addOne">+1</button>
  </div>
</template>