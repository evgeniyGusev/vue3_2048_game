<template>
  <the-main />
  <the-popup v-if="getPopup" />
</template>

<script setup>
import { computed } from 'vue';
import TheMain from './components/TheMain.vue';
import ThePopup from './components/ThePopup.vue';
import { popState } from '@/store/popup';

const getPopup = computed(() => popState.name);
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
