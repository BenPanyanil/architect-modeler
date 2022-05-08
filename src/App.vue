<template>
  <body>

    <side-menu>
    </side-menu>

    <card-pool>
    </card-pool>

  </body>
</template>

<script>

import SideMenu from "./components/SideMenu.vue";
import CardPool from "./components/CardPool.vue";

export default {
  name: 'App',
  components: {
    SideMenu,
    CardPool,
  },
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    font-size: 0.9rem;
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
