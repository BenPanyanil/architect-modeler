<template>
  <section
    class="model-pool"
    ref="modelParent">
    <!-- <model-template></model-template> -->
  </section>
</template>

<script>
// import ModelTemplate from "./ModelTemplate.vue";

export default {
  name: "ModelPool",
  components: {
    // ModelTemplate,
  },
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
  @import "../styles.scss";
  $grid-color: rgba(64, 62, 65, 0.5);
  
  .model-pool {
    display: inline-block;
    background: $grey-2;
    width: 100%;
    background-image:
      repeating-linear-gradient($grid-color 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, $grid-color 0 1px, transparent 1px 100%);
    background-size: 80px 80px;
  }
</style>