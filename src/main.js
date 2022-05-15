import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state: {
    models: [],
  },
  mutations: {
    ADD_MODEL(state, payload) {
      state.models.push(payload);
    }
  },
  actions: {
    addModel(context, payload) {
      context.commit("ADD_MODEL", payload);
    },
  }
})


createApp(App)
  .use(store)
  .mount('#app')
