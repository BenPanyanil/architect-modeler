<template>
  <body>

    <side-menu 
      @createModel="createModel">
    </side-menu>

    <model-pool
      :models="models">
    </model-pool>

  </body>
</template>

<script>

import SideMenu from "./components/SideMenu.vue";
import ModelPool from "./components/ModelPool.vue";

export default {
  name: 'App',
  components: {
    SideMenu,
    ModelPool,
  },
  data() {
    return {
      models: [],
    }
  },
  methods: {
    createModel(modelObject) {
      this.models.push(modelObject)
    }
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    position: relative;
    display: flex;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
  }
</style>
