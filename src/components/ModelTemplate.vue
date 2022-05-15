<template>
    <div 
      ref="model" 
      @mousedown.prevent="mouseDown" 
      class="model" 
      :class="modelData.type">
        <div class="model-header">
            <div>
              <span class="text-light">type:</span> {{modelData.type}}
            </div>
            <div  
              class="model-menu-handler"
              @click="toggleMenu">
              +
              <model-menu 
                v-if="openMenu"
                :modelType="modelData.type">
              </model-menu>
            </div>
        </div>

        <div 
          v-if="true" 
          class="add-button"
          @click="toggleAttributeMenu">
          +
          <model-menu 
            v-if="openAttributeMenu"
            :isAttributeMenu="true"
            :modelType="modelData.type">
          </model-menu>
        </div>

        <div class="attribute-container">
        </div>
    </div>
</template>

<script>
import ModelMenu from "./ModelMenu.vue";

export default {
  name: 'modelTemplate',
  components: {
    ModelMenu,
  },
  props: {
    isPreview: Boolean,
    modelData: Object,
    type: String,
  },
  data() {
    return {
      start_x: null,
      start_y: null,
      change_x: null,
      change_y: null,

      model: null,
      model_width: null,
      model_height: null,

      model_pos_x: null,
      model_pos_y: null,

      parent_height: null,
      parent_width: null,
      parent_bound_left: null,
      parent_bound_right: null,
      parent_bound_top: null,

      openMenu: false,
      openAttributeMenu: false,
    }
  },
  created() {
    window.addEventListener("resize", this.getParentBound);
  },
  mounted() {
    this.model = this.$refs.model;
    this.model_width = this.model.clientWidth;
    this.model_height = this.model.clientHeight;
    
    const parent = this.$parent.$refs.modelParent;
    const parentBounding = parent.getBoundingClientRect();
    this.parent_bound_left = parentBounding.left;
    this.parent_bound_right = parentBounding.right;
    this.parent_bound_top = parentBounding.top;

    if (this.isPreview) {
      this.model.style.left = parentBounding.left + 'px';
      this.model.style.top = parentBounding.top + 'px';
    } else {
        this.model.style.left = this.modelData.pos_x + 'px';
        this.model.style.top = this.modelData.pos_y + 'px';
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.getParentBound)
  },
  methods: {
    mouseDown(mouse) {
      // mouse cursor position at start
      this.start_x = mouse.clientX;
      this.start_y = mouse.clientY;
      document.onmouseup = this.dragStopped;
      document.onmousemove = this.isPreview ? this.dragInPreview : this.drag;
    },
    drag(mouse) {
      const new_x = mouse.clientX;
      const new_y = mouse.clientY;

      if (new_x < this.parent_bound_left || new_x > this.parent_bound_right || new_y < this.parent_bound_top) return;
      
      this.change_x = this.start_x - new_x;
      this.change_y = this.start_y - new_y;

      this.start_x = mouse.clientX;
      this.start_y = mouse.clientY;

      let pos_x = (this.model.offsetLeft - this.change_x);
      let pos_y = (this.model.offsetTop - this.change_y);

      if (pos_x > this.parent_bound_left && pos_x + this.model_width < this.parent_bound_right) {
        this.model.style.left = pos_x + 'px';
      }

      if (pos_y > this.parent_bound_top) {
        this.model.style.top = pos_y + 'px';
      }
    },
    dragInPreview(mouse) {
      const new_x = mouse.clientX;
      const new_y = mouse.clientY;
      
      this.change_x = this.start_x - new_x;
      this.change_y = this.start_y - new_y;

      this.start_x = mouse.clientX;
      this.start_y = mouse.clientY;

      this.model.style.left = (this.model.offsetLeft - this.change_x) + 'px';
      this.model.style.top = (this.model.offsetTop - this.change_y) + 'px';
    },
    dragStopped() {
      document.onmouseup = null;
      document.onmouseleave = null;
      document.onmousemove = null;

      // Add new model if dragged from preview
      if (this.isPreview) this.addNewModel(this.model)
    },
    quickDrag(mouse, model) {
      model.style.left = (mouse.clientX - model.clientWidth / 2) + 'px';
      model.style.top = (mouse.clientY - 30) + 'px';
    },
    quickDragStopped(model) {
      // Add new model if dragged from preview
      if (this.isPreview) this.addNewModel(model)
    },
    addNewModel(model) {
      const model_position = model.getBoundingClientRect();
      const model_pool_bounding = document.getElementById("model-pool").getBoundingClientRect();

      // Check if model is dragged to appropriate place. 
      // Otherwise return to origin position.
      if (
          model_position.x > model_pool_bounding.left && 
          model_position.x < model_pool_bounding.right &&
          model_position.y > model_pool_bounding.top
      ) {
        // create new model to main view
        const model_object = {
          "type": this.modelData.type,
          "pos_x": model_position.x,
          "pos_y": model_position.y,
        }

        this.$store.dispatch("addModel", model_object)
        this.$emit("resetModelPreview");
      } else {
        // return model back to origin
        this.model.style.left = this.parent_bound_left + "px";
        this.model.style.top = this.parent_bound_top + "px";
      }
    },
    getParentBound() {
      const parent = this.$parent.$refs.modelPool;
      const parentBounding = parent.getBoundingClientRect();
      this.parent_bound_left = parentBounding.left;
      this.parent_bound_right = parentBounding.right;
      this.parent_bound_top = parentBounding.top;
    },
    toggleMenu() {
      this.openMenu = !this.openMenu;
      this.openAttributeMenu = false;
    },
    toggleAttributeMenu() {
      this.openAttributeMenu = !this.openAttributeMenu;
      this.openMenu = false;
    },
  }
}
</script>

<style lang="scss">
  @import "../styles.scss";

  .model {
    position: absolute;
    background: $grey-0;
    width: $model-width;
    min-height: $model-min-height;
    border-radius: $model-border-radius;
    box-shadow: -2px 4px 8px rgba(0,0,0,0.3);
    cursor: move;

    .add-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      margin: 0 auto;
      width: 35px;
      height: 35px;
      border-radius: 100px;
      cursor: pointer;

      &:not(:hover) {
        color: $white;
      }
    }

    &.class {
      color: $type-class;
      border-left: 7px solid $type-class;

      .add-button {
        border: 2px solid $type-class;
        & * {
          color: $type-class;
        }
      }
    }
    &.class-instance {
      color: $type-class-instance;
      border-left: 7px solid $type-class-instance;

      .add-button {
        border: 2px solid $type-class-instance;
        & * {
          color: $type-class;
        }
      }
    }
    &.function {
      color: $type-function;
      border-left: 7px solid;

      .add-button {
        border: 2px solid $type-function;
        & * {
          color: $type-class;
        }
      }
    }

    .model-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      padding: 5px 10px 5px 15px;

      .model-menu-handler {
        font-size: 1.2rem;
        cursor: pointer;
      }
    }

    .attribute-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;
    }
  }
</style>
