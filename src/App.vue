<template>
  <div class="app">
    <p>{{ name }} - {{ age }}</p>
    <button @click="ChangeName('Zelda')">Change Name</button>
    <button @click="ChangeAge(18)">Change Age</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRef } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {},
    setup() {
      const name = ref('Link');
      const age = ref<string | number>(17);

      return {
        name,
        age
      }
    },
    methods: {
      ChangeName(name: string){
        this.name = name;
      },
      ChangeAge(age: number | string){
        this.age = age;
      }
    }
  });
</script>

<style>
</style>