<template>
  <div class="hello-popup">
    <div class="left">
      <div class="title" v-html="mainState.state.helloPopupTitle.value" />

      <div class="text first">
        Используйте кнопки ←↑→↓ или свайп (в&nbsp;мобильной версии), чтобы перемещать элементы по игровому полю.
        Когда&nbsp;2&nbsp;одинаковых элемента соприкасаются друг с другом, они сливаются и образуют новый элемент.
      </div>
      <div class="text second">
        {{ getSecondText }}
      </div>
    </div>

    <div class="right"></div>
  </div>

  <button class="app-button" :disabled="gameStatus" @click="startGame">
    Играть
  </button>
</template>

<script setup>
import { computed } from 'vue';
import getNoun from 'nouns-number';
import {
  startTimer,
  time,
  gameStatus,
  mq,
  mobActive,
  addListeners,
  scrollUnlock,
  scrollLock,
} from '@/composables/game';
import { popMethods } from '@/store/popup';
import { mainState } from '@/store/data';

const getSecondText = computed(() => `Ваша главная задача — успеть собрать финальный элемент за ${mainState.state.timeMinutes.value} ${getNoun(['минуту', 'минуты', 'минут'], mainState.state.timeMinutes.value)}. Главный приз — ${mainState.state.finalPrize.value}`);

const startGame = () => {
  popMethods.setPopupName('');

  if (time.minutes || time.seconds) {
    addListeners();

    if (mq.value === 'md') {
      mobActive.value = true;
      window.scrollTo(0, 150);
      scrollLock();
    }

    if (mq.value === 'iPad') {
      window.scrollTo(0, 50);
      scrollLock();
    }

    startTimer(() => {
      popMethods.setPopupName('OopsPopup');
      gameStatus.value = true;
      scrollUnlock();
    });
  }
};
</script>

<style lang="scss" scoped>
.hello-popup {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-right: 25px;

    .title {
      margin-bottom: 28px;
      font-size: 36px;
      line-height: 120%;
      font-weight: 400;
    }

    .text {
      max-width: 312px;
      font-size: 15px;
      line-height: 130%;

      &.first {
        margin-bottom: 25px;
      }

      &.second {
        margin-bottom: 52px;
      }
    }
  }

  .right {
    width: 277px;
    height: 280px;
    background: url("/img/game-rules.gif") center no-repeat;
    background-size: contain;
  }
}

.app-button {
  width: 90%;
}

@media screen and (max-width: 1100px) {
  .hello-popup {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    .left {
      margin-right: 0;
      margin-bottom: 50px;

      .title {
        margin-bottom: 20px;
        font-size: 32px;
        text-align: center;
      }

      .text {
        max-width: 100%;
        width: 100%;

        &.first {
          margin-bottom: 10px;
        }

        &.second {
          margin-bottom: 0;
        }
      }
    }

    .right {
      width: 360px;
      height: 407px;
      margin-bottom: 20px;
    }
  }

  .app-button {
    display: block;
    width: 360px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 700px) {
  .hello-popup {
    .left {
      margin-bottom: 10px;

      .title {
        margin-bottom: 12px;
        font-size: 21px;
      }

      .text {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .right {
      width: 200px;
      height: 226px;
    }
  }

  .app-button {
    width: 200px;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
