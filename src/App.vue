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
      <section class="saved-solutions">

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
  $white: #fcfcee;

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
    background: lightgoldenrodyellow;
  }

  .card-menu {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    display: inline-flex;
    flex-direction: column;
    background: #221f22;
    height: 100vh;
    width: 400px;
    padding: 40px;
    color: $white;
  }

  .card-pool {
    display: inline-block;
    background: #2d2a2e;
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
    border-bottom: 1px solid $white;
  }
</style>
