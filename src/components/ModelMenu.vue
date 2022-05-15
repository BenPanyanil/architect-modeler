<template>
  <main class="model-menu-container">
    <div v-for="option, i in options" :key="i">
      <span class="model-menu-option">
        {{ option }}
      </span>
    </div>
  </main>
</template>

<script>
export default {
  name: "ModelMenu",
  props: {
    modelType: String,
  },
  data() {
    return {
      options: [
        "Add",
        "Delete"
      ]
    }
  },
}
</script>

<style lang="scss">
  @import "../styles.scss";
  .model-menu-container {
    position: absolute;
    right: -205px;
    top: -5px; 
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 200px;
    background: $grey-4;
    padding: 10px 20px;

    .model-menu-option:hover {
      color: $white;
    }
  }
</style>