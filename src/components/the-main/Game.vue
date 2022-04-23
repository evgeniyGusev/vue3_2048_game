<template>
  <div class="game-main">
    <div class="top">
      <div class="timer">
        {{ `${'0' + time.minutes}:${time.seconds < 10 ? '0' + time.seconds : time.seconds}` }}
      </div>
      <div class="round">
        {{ !gameStatus ? 'У вас 1 попытка' : 'Попыток больше нет' }}
      </div>
    </div>

    <div class="field">
      <div class="game">
        <div id="tile-container" class="tile-container"></div>
      </div>
    </div>

    <div class="controls">
      <hints />
      <div class="repeat" @click="showRules">
        <div class="arrow" />
        Посмотреть обучение еще раз
      </div>
    </div>

    <a :href="mainState.state.gameRulesLink" class="rules">
      Правила акции
    </a>
  </div>
</template>

<script setup>
/*eslint-disable*/
import { onMounted } from 'vue';
import {
  time,
  gameInit,
  pauseTimer,
  gameStatus,
} from '@/composables/game';
import { popMethods } from '@/store/popup';
import { mainState } from '@/store/data';
import Hints from './Hints.vue';

onMounted(() => {
  gameInit();
});

const showRules = () => {
  popMethods.setPopupName('HelloPopup');
  pauseTimer();
};

const checks = mainState.state.checkers.value.length
  ? mainState.state.checkers.value.map((el) => `url("${el}") center no-repeat`)
  : new Array(6).fill(`url("/img/mock-hint.svg") center no-repeat`);

</script>

<style lang="scss" scoped>
.game-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;

  .rules {
    display: none;
  }

  .controls {
    display: none;
  }

  .top {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin-bottom: 17px;
    padding: 7px 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 16px;
    line-height: 140%;
    font-weight: 400;

    .timer {
      width: 20%;
      letter-spacing: 0.05em;
    }
  }

  .game {
    position: relative;
    margin: 0 auto;
    padding: 0;
    display: inline-block;
    border-radius: 3px;
    box-sizing: border-box;
  }

  .tile-container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 400px;
    height: 400px;

    :deep {
      .tile, .background {
        display: block;
        position: absolute;
        width: 84px;
        height: 84px;
      }

      .background {
        box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.2);
      }

      .tile {
        opacity: 0;
        background: v-bind('checks[0]');
        background-size: 50px 50px;
        transition: 110ms ease-in-out;

        &--4 {
          background: v-bind('checks[1]');
          background-size: 60px 60px;
        }

        &--8 {
          background: v-bind('checks[2]');
          background-size: 50px 50px;
        }

        &--16 {
          background: v-bind('checks[3]');
          background-size: 50px 50px;
        }

        &--32 {
          background: v-bind('checks[4]');
          background-size: 50px 50px;
        }

        &--64 {
          box-shadow: 0 0 40px 10px #f1f600;
          background: v-bind('checks[5]');
          background-size: 50px 50px;
        }

        &--128 {
          background: v-bind('checks[5]');
          background-size: 50px 50px;
        }

        &--256 {
          background: v-bind('checks[5]');
          background-size: 50px 50px;
        }

        &--pop {
          animation: pop 0.3s ease-in-out;
          animation-fill-mode: forwards;
        }

        &--shrink {
          animation: shrink 0.5s ease-in-out;
          animation-fill-mode: forwards;
        }

        @keyframes pop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          90% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shrink {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.9;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .game-main {
    width: 280px;

    .rules {
      display: block;
      margin: 10px auto 0;
      text-decoration: underline;
    }

    .top {
      width: 100%;

      .round {
        font-size: 13px;
      }
    }

    .controls {
      display: flex;
      align-items: center;
    }
    .hints {
      display: inline-block;
      width: 50%;
      transform: rotate(0);

      :deep {
        .button {
          width: 100%;
          padding-bottom: 0;
          box-shadow: none;
          text-decoration: underline;
          text-align: left;

          .list {
            left: -27px;
            bottom: 47px;
            padding: 13px 20px;
            transform: rotate(0);

            .row {
              .item {
                width: 37px;
                height: 37px;
              }
            }
          }
        }
      }
    }

    .repeat {
      display: flex;
      align-items: center;
      width: 50%;
      font-size: 12px;
      line-height: 16px;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        .arrow {
          transform: rotate(-360deg);
        }
      }

      .arrow {
        min-width: 20px;
        height: 20px;
        margin-right: 10px;
        background: url("/img/refresh.svg") center no-repeat;
        background-size: contain;
      }
    }

    .timer {
      width: 100%;
    }

    .field {
      margin-bottom: 20px;
    }

    .tile-container {
      width: 100%;
      height: 280px;

      :deep {
        .tile,
        .background {
          width: 55px;
          height: 55px;
        }
      }
    }
  }
}
</style>
