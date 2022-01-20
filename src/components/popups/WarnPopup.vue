<template>
  <div class="warn-popup">
    <div class="image" />
    <div class="title">
      Вы уже сыграли в «2048».
    </div>

    <div class="text">
      Проверьте почту — ваш подарок уже там!
    </div>

    <button class="app-button" @click="close">
      Хорошо
    </button>
  </div>
</template>

<script setup>
import { popMethods } from '@/store/popup';

const close = () => popMethods.setPopupName('');
</script>

<style lang="scss" scoped>
.warn-popup {
  position: relative;
  padding-right: 160px;

  .image {
    position: absolute;
    top: 22px;
    right: -20px;
    width: 160px;
    height: 160px;
    background: url("/img/popgift.png") center no-repeat;
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
  .warn-popup {
    width: 400px;
    margin: 0 auto;
    padding-right: 0;

    .image {
      position: absolute;
      top: 70%;
      right: -170px;
      transform: rotate(-60deg);
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
  .warn-popup {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 112px;

    .image {
      position: absolute;
      top: 70%;
      right: 21%;
      width: 175px;
      height: 175px;
      transform: rotate(-45deg);
      background: url("/img/popgift.png") center no-repeat;
      background-size: contain;
    }

    .title {
      margin-bottom: 15px;
      font-size: 21px;
    }

    .text {
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
