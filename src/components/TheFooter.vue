<template>
  <footer class="the-footer">
    <div class="contacts-block">
      <a :href="mainState.state.footerLegalInfo.link" target="_blank">
        @{{ mainState.state.footerLegalInfo.value }}
      </a>
      <a :href="`tel:${mainState.state.footerPhone.value}`" v-text="mainState.state.footerPhone.text"/>
      <a :href="`mailto:${mainState.state.footerEmail.value}`" v-text="mainState.state.footerEmail.value"/>
    </div>
  </footer>
</template>

<script setup>
import { mainState } from '@/store/data';
</script>

<style lang="scss" scoped>
.the-footer {
  display: flex;
  justify-content: space-between;
  padding: 49px 100px 46px 100px;
  background: #252937;
  color: #868EA5;

  a {
    color: #868EA5;
    font-size: 24px;

    &:hover {
      color: #75CDFE;
    }
  }

  .contacts-block {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
  }
}

@media screen and (max-width: 900px) {
  .the-footer {
    padding: 25px 61px 22px 57px;

    .contacts-block {
      flex-direction: column;
      margin: 0 0 20px 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .the-footer {
    padding: 25px 25px 22px 25px;
  }
}

</style>
