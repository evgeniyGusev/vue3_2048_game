<template>
  <div class="content">
    <Game :class="[!showGame && 'g']" />
    <Hints class="content-hints" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { mobActive, scrollLock } from '@/composables/game';
import Game from './Game.vue';
import Hints from './Hints.vue';

const showGame = ref(false);

watch(() => mobActive.value, (val) => {
  if (val) {
    showGame.value = true;
    window.scrollTo(0, 150);
    scrollLock();
  }
});
</script>

<style lang="scss" scoped>
.content {
  z-index: 3;
  position: relative;
  padding: 30px;
  border-radius: 20px;
  background-color: #fff;

  .hints {
    position: absolute;
    top: 54%;
    right: -162px;
    cursor: pointer;
  }
}

@media screen and (max-width: 1100px) {
  .content {
    flex-direction: column;
    justify-content: flex-start;
    padding: 40px 35px;
  }
}

@media screen and (max-width: 700px) {
  .content {
    padding: 20px;

    .content-hints {
      display: none;
    }

    .g {
      display: none;
    }
  }
}
</style>
