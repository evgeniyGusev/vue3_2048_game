<template>
  <div class="the-popup">
    <div :class="['content', getPopup === 'EmailPopup' && 'content-email']">
      <div v-if="getPopup !== 'EmailPopup' && getPopup !== 'OopsPopup'" class="close" @click="closePopup" />
      <component :is="components[getPopup]" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { popState, popMethods } from '@/store/popup';
import {
  gameInit,
  time,
  startTimer,
  gameStatus,
  count,
  mobActive,
  mq,
  addListeners,
  removeListeners,
  scrollLock,
  scrollUnlock,
} from '@/composables/game';
import HelloPopup from './popups/HelloPopup.vue';
import WarnPopup from './popups/WarnPopup.vue';
import OopsPopup from './popups/OopsPopup.vue';

const components = {
  HelloPopup,
  WarnPopup,
  OopsPopup,
};

const getPopup = computed(() => popState.name);
const closePopup = () => {
  if (getPopup.value === 'HelloPopup' && (time.minutes || time.seconds)) {
    console.log(mq.value);
    if (mq.value === 'md') {
      console.log('тут');
      window.scrollTo(0, 150);
      scrollLock();
    }

    if (mq.value === 'iPad') {
      window.scrollTo(0, 150);
      scrollLock();
    }

    startTimer(() => {
      popMethods.setPopupName('OopsPopup');
      gameStatus.value = true;
      scrollUnlock();
    });

    if (!count.value && mq.value === 'md') {
      mobActive.value = true;
    }

    addListeners();
  } else {
    gameInit();
    removeListeners();
  }

  popMethods.setPopupName('');
};

onMounted(() => {
  if (getPopup.value !== 'HelloPopup') {
    removeListeners();
  }
});
</script>

<style lang="scss" scoped>
.the-popup {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);

  .content {
    overflow: hidden;
    position: relative;
    padding: 40px;
    border-radius: 20px;
    background: #fff;

    .close,
    .ball,
    .gift {
      position: absolute;
    }

    .close {
      top: 20px;
      right: 20px;
      width: 15px;
      height: 15px;
      background: url("/img/close.svg") center no-repeat;
      cursor: pointer;
    }

    .ball {
      left: -17px;
      top: 90px;
      width: 108px;
      height: 140px;
      background: url("/img/ball.png") center no-repeat;
      background-size: contain;
    }

    .gift {
      right: -28px;
      bottom: 0;
      width: 108px;
      height: 140px;
      background: url("/img/gift.png") center no-repeat;
      background-size: contain;
    }
  }
}

@media screen and (max-width: 1100px) {
  .the-popup {
    overflow-y: auto;
    align-items: flex-start;
    padding: 30px 60px;

    .content {
      width: 100%;
      padding: 40px 50px;

      .ball {
        top: 500px;
      }

      &-email {
        .ball {
          top: 100px;
        }
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .the-popup {
    padding: 20px;

    .content {
      padding: 25px;

      .ball,
      .gift {
        display: none;
      }

      &-email {
        .ball,
        .gift {
          display: block;
        }

        .ball {
          width: 100px;
          height: 100px;
          top: 90px;
          left: -25px;
        }
      }
    }
  }
}
</style>
