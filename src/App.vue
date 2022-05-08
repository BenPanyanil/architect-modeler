<template>
  <body>

    <section class="card-menu">
      <section class="card-menu-section">
        <div class="program-objects">
          <span>Class +</span>
          <span>Class instance +</span>
          <span>Function +</span>
        </div>
      </section>

      <section class="card-menu-section">
        <span>Model preview</span>
        <div class="model-preview-container">

        </div>
      </section>
    </section>

    <section
      class="card-pool"
      ref="cardPool">
      <card-template></card-template>
    </section>

  </body>
</template>

<script>
import CardTemplate from "./components/CardTemplate.vue";

export default {
  name: 'App',
  components: {
    CardTemplate,
  },
  data() {
    return {
      cardPool: null,
    }
  },
}
</script>

<style lang="scss">
  @import "./styles.scss";

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

  .card-menu {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    display: inline-flex;
    flex-direction: column;
    background: $grey_3;
    height: 100vh;
    min-width: 320px;
    padding: 30px;
    color: $white;
  }

  .card-pool {
    display: inline-block;
    background: $grey_2;
    width: 100%;
  }

  .program-objects {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .program-objects span {
    cursor: pointer;
  }

  .card-menu-section {
    padding: 30px 0px;
    border-bottom: 1px solid $grey_0;
    width: 100%;
  }

  .model-preview-container {
    margin-top: 10px;
    background: $grey_1;
    width: 100%;
    min-height: 300px;
  }
</style>
