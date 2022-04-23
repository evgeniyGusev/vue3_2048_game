<template>
  <div :id="mainState.state.theme.value" class="wrap">
    <the-main />
    <the-footer />
    <the-popup v-if="getPopup" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { popState } from '@/store/popup';
import { mainState, mainMethods } from '@/store/data';
import { time } from '@/composables/game';
import data from '@/mock/data';
import TheFooter from './components/TheFooter.vue';
import TheMain from './components/TheMain.vue';
import ThePopup from './components/ThePopup.vue';

mainMethods.setState(data);
time.minutes = mainState.state.timeMinutes.value;
time.seconds = mainState.state.timeSeconds.value;

const getPopup = computed(() => popState.name);
</script>

<style lang="scss">
.wrap {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
