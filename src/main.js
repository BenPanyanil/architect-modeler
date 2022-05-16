import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state: {
    models: [],
    modelPoolBounding: null,
    modelPreviewBounding: null,
  },
  mutations: {
    ADD_MODEL(state, payload) {
      state.models.push(payload);
    },
    ADD_MODEL_POOL_BOUNDING(state, payload) {
      state.modelPoolBounding = payload;
    },
    ADD_MODEL_PREVIEW_BOUNDING(state, payload) {
      state.modelPreviewBounding = payload;
    }
  },
  actions: {
    addModel(context, payload) {
      context.commit("ADD_MODEL", payload);
    },
    addModelPoolBounding(context, payload) {
      context.commit("ADD_MODEL_POOL_BOUNDING", payload);
    },
    addModelPreviewBounding(context, payload) {
      context.commit("ADD_MODEL_PREVIEW_BOUNDING", payload);
    }
  }
})


createApp(App)
  .use(store)
  .mount('#app')
