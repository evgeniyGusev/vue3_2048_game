<template>
  <div class="oops-popup">
    <div class="image" />
    <div class="title">
      Ой!
    </div>

    <div class="text">
      Что-то пошло не так: вы не собрали ни одной пары.<br>
      Попробуйте еще раз.
    </div>

    <button class="app-button" @click="close">
      Еще попытка
    </button>
  </div>
</template>

<script setup>
import { popMethods } from '@/store/popup';
import {
  resetTime,
  startTimer,
  gameStatus,
  mq,
  gameInit,
  addListeners,
  scrollLock,
  scrollUnlock,
} from '@/composables/game';

const close = () => {
  resetTime();
  gameInit();
  popMethods.setPopupName('');

  if (mq.value === 'md') {
    window.scrollTo(0, 150);
    scrollLock();
  }

  if (mq.value === 'iPad') {
    window.scrollTo(0, 50);
    scrollLock();
  }

  startTimer(() => {
    popMethods.setPopupName('OopsPopup');
    gameStatus.value = false;
    scrollUnlock();
  });

  addListeners();
};
</script>

<style lang="scss" scoped>
.oops-popup {
  position: relative;
  padding-right: 160px;

  .image {
    position: absolute;
    top: 10px;
    right: -30px;
    width: 200px;
    height: 200px;
    background: url("/img/bell.png") center no-repeat;
    background-size: contain;
  }

  .title {
    max-width: 480px;
    margin-bottom: 10px;
    font-size: 36px;
    line-height: 120%;
    font-weight: 400;
  }

  .text {
    margin-bottom: 40px;
    max-width: 412px;
    font-size: 15px;
    line-height: 130%;
  }

  .app-button {
    width: 288px;
  }
}

@media screen and (max-width: 1100px) {
  .oops-popup {
    width: 400px;
    margin: 0 auto;
    padding-right: 0;

    .image {
      position: absolute;
      top: -30px;
      right: 100%;
    }

    .title {
      max-width: 100%;
      width: 100%;
      font-size: 32px;
      text-align: center;
    }

    .text {
      margin-bottom: 30px;
      max-width: 100%;
      width: 100%;
      text-align: center;
    }

    .app-button {
      width: 100%;
    }
  }
}

@media screen and (max-width: 500px) {
  .oops-popup {
    width: 100%;
    padding-top: 112px;

    .image {
      top: -40px;
      right: 21%;
      width: 150px;
      height: 150px;
    }

    .title {
      margin-bottom: 15px;
      font-size: 21px;
    }

    .text {
      max-width: 80%;
      margin: 0 auto 30px;
      font-size: 14px;
      line-height: 20px;
    }

    .app-button {
      width: 100%;
      margin-bottom: 0;
    }

    .spam {
      display: none;
    }
  }
}
</style>
