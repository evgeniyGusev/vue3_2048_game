<template>
  <div class="hints">
    <div class="button" @click="hintListHandler">
      {{ isListShown ? 'Свернуть подсказку' : 'Развернуть подсказку' }}

      <div v-show="isListShown" class="list">
        <div
          v-for="(row, i) in hintsMatrix.length ? hintsMatrix : mockHints"
          :key="i"
          class="row"
        >
          <div class="item" :style="{ backgroundImage: `url('${row.first}')` }" />
          +
          <div class="item" :style="{ backgroundImage: `url('${row.first}')` }" />
          =
          <div class="item" :style="{ backgroundImage: `url('${row.total}')` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { mainState } from '@/store/data';

const hintsMatrix = mainState.state.checkers?.value
  .map((el, i) => ({
    first: el,
    total: mainState.state.checkers.value[i + 1] || el,
  }))
  .splice(0, mainState.state.checkers?.value.length - 1);

const isListShown = ref(false);

const hintListHandler = () => {
  isListShown.value = !isListShown.value;
};

const mockHints = new Array(6).fill({
  first: '/img/mock-hint.svg',
  total: '/img/mock-hint.svg',
});
</script>

<style lang="scss" scoped>
.hints {
  z-index: 0;
  transform: rotate(-90deg);

  .button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 282px;
    height: 43px;
    padding-bottom: 10px;
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 10px 10px;
    background: #fff;
    text-align: center;

    .list {
      z-index: 5;
      position: absolute;
      left: 25px;
      bottom: 13px;
      padding: 25px 40px;
      transform: rotate(90deg);
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 14px;

        .item {
          width: 48px;
          height: 52px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;

          &:not(:last-child) {
            margin-right: 10px;
          }

          &:not(:first-child) {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
