<template>
  <div class="info">
    <img :src="mainState.state.logo.value" :alt="mainState.state.h1.value" class="logo">
    <h1 class="title" v-text="mainState.state.h1.value" />

    <div v-if="mq !== 'md' || !mobActive" class="text first" v-text="mainState.state.description.value" />

    <div v-if="mq !== 'md' || !mobActive" class="repeat" @click="showRules">
      <div class="arrow" />
      Посмотреть обучение еще раз
    </div>

    <a :href="mainState.state.gameRulesLink.value" class="rules">
      Правила акции
    </a>
  </div>
</template>

<script setup>
import {
  mq,
  pauseTimer,
  mobActive,
} from '@/composables/game';
import { popMethods } from '@/store/popup';
import { mainState } from '@/store/data';

const showRules = () => {
  popMethods.setPopupName('HelloPopup');
  pauseTimer();
};
</script>

<style lang="scss" scoped>
.info {
  max-width: 495px;

  .logo {
    width: 65px;
    height: 65px;
    margin-bottom: 26px;
  }

  .title {
    position: relative;
    margin-bottom: 19px;
    font-size: 36px;
    line-height: 120%;
    font-weight: 400;

    .hat {
      position: absolute;
      top: -15px;
      left: -3px;
      width: 37px;
      height: 33px;
      background: url("/img/hat.png") center no-repeat;
    }
  }

  .text {
    max-width: 420px;
    font-size: 20px;
    line-height: 140%;

    &.first {
      margin-bottom: 16px;
    }

    &.second {
      margin-bottom: 35px;
    }
  }

  .button {
    width: 255px;
    margin-bottom: 48px;
  }

  .repeat {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 16px;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      .arrow {
        transform: rotate(-360deg);
      }
    }

    .arrow {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      background: url("/img/refresh.svg") center no-repeat;
    }
  }

  .rules {
    display: none;
  }
}

@media screen and (max-width: 1100px) {
  .info {
    position: relative;
    max-width: 100%;
    width: 100%;
    margin-bottom: 45px;

    .logo {
      position: absolute;
      top: 0;
      right: 0;
      margin-bottom: 0;
    }

    .title {
      max-width: 473px;
      font-size: 32px;
    }

    .text {
      max-width: 510px;
      font-size: 15px;
      line-height: 24px;

      &.first {
        margin-bottom: 10px;
      }

      &.second {
        margin-bottom: 20px;
      }
    }

    .button {
      width: 255px;
      margin-right: 45px;
      margin-bottom: 0;
      padding: 20px 0;
    }

    .repeat {
      position: relative;
      display: inline-block;
      max-width: 190px;
      padding-left: 28px;
      transform: translateY(5px);

      .arrow {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        margin-right: 10px;
      }
    }

    .rules {
      display: inline;
      text-decoration: underline;
    }
  }
}

@media screen and (max-width: 700px) {
  .info {
    margin-bottom: 0;
    padding-bottom: 20px;

    .logo {
      width: 50px;
      height: 50px;
    }

    .title {
      max-width: 220px;
      font-size: 21px;
      line-height: 110%;

      .hat {
        top: -18px;
        left: -6px;
        width: 31px;
        height: 33px;
        background-size: contain;
      }
    }

    .text {
      font-size: 14px;
      line-height: 20px;

      &.first {
        margin-bottom: 10px;
      }

      &.second {
        margin-bottom: 25px;
      }
    }

    .app-button {
      display: block;
      width: 220px;
      margin: 0 auto 23px;
      font-size: 14px;
      line-height: 16px;
    }

    .repeat {
      display: block;
      max-width: 100%;
      width: 230px;
      margin: 0 auto;
    }

    .rules {
      display: none;
    }
  }
}
</style>
