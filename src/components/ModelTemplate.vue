<template>
    <div 
      ref="model" 
      @mousedown.prevent="mouseDown" 
      class="model" :class="modelData.type">
        <div class="model-header">
            <span class="text-light">type:</span> {{modelData.type}}
        </div>
        <div class="add-button">+</div>
        <div class="attribute-container">
        </div>
    </div>
</template>

<script>

export default {
  name: 'modelTemplate',
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
      if (this.isPreview) this.addNewModel()
    },
    addNewModel() {
      const model_position = this.model.getBoundingClientRect();
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
    }
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
    overflow: hidden;
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
      color: $white;
      cursor: pointer;
    }

    &.class {
      color: $blue;
      border-left: 7px solid $blue;

      .add-button {
        border: 2px solid $blue;
        &:hover {
          color: inherit;
        }
      }
    }
    &.class-instance {
      color: $purple;
      border-left: 7px solid $purple;

      .add-button {
        border: 2px solid $purple;
        &:hover {
          color: inherit;
        }
      }
    }
    &.function {
      color: $green;
      border-left: 7px solid;

      .add-button {
        border: 2px solid $green;
        &:hover {
          color: inherit;
        }
      }
    }

    .model-header {
      font-weight: 500;
      padding: 5px 15px;
    }

    .attribute-container {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
</style>
