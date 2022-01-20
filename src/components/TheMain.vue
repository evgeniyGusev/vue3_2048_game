<template>
  <div class="the-main">
    <div class="app-container">
      <Content />
    </div>
  </div>
</template>

<script>
import Content from './the-main/Content.vue';

export default {
  name: 'TheMain',
  components: { Content },
};
</script>

<style lang="scss" scoped>
.the-main {
  display: flex;
  align-items: center;
  min-height: 100%;
  min-width: 100%;
  padding: 30px;
  background: url("/img/bg.jpg") center no-repeat;
  background-size: cover;
}

@media screen and (max-width: 1100px) {
  .the-main {
    padding: 30px 20px;
  }
}

@media screen and (max-width: 700px) {
  .the-main {
    padding: 30px 20px;
  }
}
</style>
