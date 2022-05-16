<template>
  <main class="side-menu" ref="sideMenu">

    <section class="language-picker">
    </section>

    <section class="side-menu-section">
      <div class="program-objects">
        <span 
          tabindex="0"
          @keypress.space="createModel('class')" 
          @click="createModel('class')">
            Class +
          </span>
        <span 
          tabindex="0"
          @keypress.space="createModel('class-instance')" 
          @click="createModel('class-instance')">
            Class instance +
          </span>
        <span 
          tabindex="0"
          @keypress.space="createModel('function')" 
          @click="createModel('function')">
            Function +
          </span>
      </div>
    </section>

    <section class="side-menu-section">
      <span>Model preview</span>
      <div
        ref="modelPreview" 
        class="model-preview-container">
        <div 
          class="clip-path-container" 
          :class="{'open-clip-path': clipOpen, 'on-quickdrag': onQuickDrag}">
          <model-template 
            v-if="modelPreview"
            @resetModelPreview="resetModelPreview"
            :isPreview="true"
            v-model:modelData="modelPreview">
          </model-template>
        </div>
      </div>
    </section>

    <section class="side-menu-section">
      <span>My solutions</span>
    </section>

  </main>
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
      modelPreview: null,
      clipOpen: false,
      onQuickDrag: false,
    }
  },
  mounted() {
    const modelPreviewBounding = this.$refs.modelPreview.getBoundingClientRect();
    this.$store.dispatch("addModelPreviewBounding", modelPreviewBounding);
    // window.onkeydown = this.startQuickDrag;
    // window.onkeyup = this.stopQuickDrag
  },
  // unmounted() {
  //   window.onkeydown = null;
  //   window.onkeyup = null;
  // },
  methods: {
    createModel(type) {
      this.clipOpen = true;
      const typeObject = {
        type: type,
      }
      this.modelPreview = typeObject;
    },
    resetModelPreview() {
      this.clipOpen = false;
      this.modelPreview = null;
    },
    // startQuickDrag(e) {
    //   if (e.key === "Control" && this.modelPreview) {
    //     this.onQuickDrag = true;
    //     const model = this.$refs.modelPreview.$refs.model;
        
    //     if (window.onmousemove === null) {
    //       window.onmousemove = (mouse) => {
    //         ModelTemplate.methods.quickDrag(mouse, model);
    //       };
    //     }
    //   }
    // },
    // stopQuickDrag(e) {
    //   if (e.key === "Control" && this.modelPreview) {
    //     window.onmousemove = null;
    //     ModelTemplate.methods.quickDragStopped();
    //   }
    // },
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
}

.program-objects {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.program-objects span {
  align-self: start;
  cursor: pointer;

  &:hover {
    color: $orange;
  }
  &:focus {
    color: $orange;
    outline-style: groove;
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
  .clip-path-container:active, .clip-path-container.on-quickdrag  {
    clip-path: unset;
  }

}
</style>