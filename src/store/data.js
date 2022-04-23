import { reactive } from 'vue';

const state = reactive({
  state: null,
});

const methods = {
  setState(payload) {
    state.state = payload;
  },
};

export { state as mainState, methods as mainMethods };
