<template>
  <main
    id="model-pool"
    ref="modelPool">
    <model-template
      v-for="model, i in models"
      :key="i"
      :modelData="model">
    </model-template>
  </main>
</template>

<script>
import ModelTemplate from "./ModelTemplate.vue";

export default {
  name: "ModelPool",
  components: {
    ModelTemplate,
  },
  mounted() {
    const modelPoolBounding = this.$refs.modelPool.getBoundingClientRect();
    this.$store.dispatch("addModelPoolBounding", modelPoolBounding);
    window.addEventListener("resize", () => {
      const modelPoolBounding = this.$refs.modelPool.getBoundingClientRect();
      this.$store.dispatch("addModelPoolBounding", modelPoolBounding);
    });
  },
  unmounted() {
    window.removeEventListener("resize")
  },
  computed: {
    models() {
      return this.$store.state.models;
    },
  },
}
</script>

<style lang="scss">
  @import "../styles.scss";
  $grid-color: rgba(64, 62, 65, 0.5);
  
  #model-pool {
    display: inline-block;
    background: $grey-2;
    width: 100%;
    background-image:
      repeating-linear-gradient($grid-color 0 1px, transparent 1px 100%),
      repeating-linear-gradient(90deg, $grid-color 0 1px, transparent 1px 100%);
    background-size: 80px 80px;
  }
</style>