<script setup>
import Content from './the-main/Content.vue';
</script>

<template>
  <div class="the-main">
    <div class="app-container">
      <Content />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-main {
  padding: 60px 0;
}

@media screen and (max-width: 1100px) {
  .the-main {
    padding: 30px 20px;
  }
}

@media screen and (max-width: 700px) {
  .the-main {
    padding: 30px 20px;
  }
}
</style>
