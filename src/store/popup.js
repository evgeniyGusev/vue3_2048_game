import { reactive } from 'vue';

const state = reactive({
  name: 'HelloPopup',
  data: null,
});

const methods = {
  setPopupName(payload) {
    state.name = payload;
  },
  setPopupData(payload) {
    state.data = payload;
  },
};

export { state as popState, methods as popMethods };
