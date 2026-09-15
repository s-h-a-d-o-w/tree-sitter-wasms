<template>
  <div class="greeter">
    <h1>{{ greeting }}</h1>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  data() {
    return { items: ["tree-sitter", "wasm"] };
  },
  computed: {
    greeting() {
      return `Hello, ${this.name}!`;
    },
  },
};
</script>

<style scoped>
.greeter {
  color: red;
}
</style>
