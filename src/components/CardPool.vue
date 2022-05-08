<template>
  <section
    class="card-pool"
    ref="cardPool">
    <card-template></card-template>
  </section>
</template>

<script>
import CardTemplate from "./CardTemplate.vue";

export default {
  name: "CardPool",
  components: {
    CardTemplate,
  }
}
</script>

<style lang="scss">
  @import "../styles.scss";
  $grid-color: rgba(64, 62, 65, 0.5);
  
  .card-pool {
    display: inline-block;
    background: $grey_2;
    width: 100%;
    background-image:
      repeating-linear-gradient($grid_color 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, $grid_color 0 1px, transparent 1px 100%);
    background-size: 80px 80px;
  }
</style>