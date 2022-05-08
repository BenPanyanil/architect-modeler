<template>
  <section class="side-menu">
    <section class="language-picker">
    </section>

    <section class="side-menu-section">
      <div class="program-objects">
        <span @click="createModel('class')">Class +</span>
        <span @click="createModel('class-instance')">Class instance +</span>
        <span @click="createModel('function')">Function +</span>
      </div>
    </section>

    <section class="side-menu-section">
      <span>Model preview</span>
      <div
        ref="modelParent" 
        class="model-preview-container">
        <div 
          class="clip-path-container" 
          :class="{'open-clip-path': clipOpen}">
          <model-template 
            v-if="previewModel"
            @mouseup="clipOpen = false"
            :isPreview="true"
            v-model:previewModel="previewModel">
          </model-template>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import ModelTemplate from "./ModelTemplate.vue";


export default {
  name: "SideMenu",
  components: {
    ModelTemplate,
  },
  data() {
    return {
      previewModel: null,
      clipOpen: false,
    }
  },
  methods: {
    createModel(type) {
      this.clipOpen = true;
      const typeObject = {
        type: type,
      }
      this.previewModel = typeObject;
    },
  }
}
</script>

<style lang="scss">
@import "../styles.scss";

.side-menu {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  display: inline-flex;
  flex-direction: column;
  background: $grey-3;
  height: 100vh;
  color: $white;
  box-shadow: 1px 0 0 1px $grey-3;
  font-size: 0.9rem;
}

.program-objects {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.program-objects span {
  cursor: pointer;

  &:hover {
    color: $orange;
  }
}

// .language-picker {
//   background: $grey-4;
//   padding: 15px 25px;
// }

.side-menu-section {
  padding: 30px 25px;
}

.side-menu-section:not(:last-child) {
  border-bottom: 1px solid $grey-0;
}

.model-preview-container {
  margin-top: 15px;
  width: $model-width;
  height: $model-min-height;
  border: 5px solid $grey-0;
  border-radius: $model-border-radius;

  .clip-path-container {
    width: 100%;
    height: 100%;
    transition-duration: 500ms;
    clip-path: circle(0% at 50% 50%);
  }
  .clip-path-container.open-clip-path {
    clip-path: circle(100% at 50% 50%);
  }
  .clip-path-container:active {
    clip-path: unset;
  }

}
</style>