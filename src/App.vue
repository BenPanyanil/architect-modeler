<template>
  <body>
    <side-menu>
    </side-menu>

    <model-pool>
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
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import "./styles.scss";

  * {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
  }

  body {
    position: relative;
    display: flex;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
  }

  .text-light {
    color: $white;
  }

  .text-dark {
    color: $black;
  }
</style>
