<template>
    <div 
      ref="model" 
      @mousedown.prevent="mouseDown" 
      class="model" :class="type || previewModel.type">
        <div class="model-header">
            type: <span class="type-name">{{type || previewModel.type}}</span>
        </div>
    </div>
</template>

<script>

export default {
  name: 'modelTemplate',
  props: {
    isPreview: Boolean,
    previewModel: Object,
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
      document.onmouseup = this.mouseStop;
      document.onmousemove = this.isPreview ? this.mouseDragPreview : this.mouseDrag;
    },
    mouseDrag(mouse) {
      const new_x = mouse.clientX;
      const new_y = mouse.clientY;

      if (new_x < this.parent_bound_left || new_x > this.parent_bound_right || new_y < this.parent_bound_top) return;
      
      this.change_x = this.start_x - new_x;
      this.change_y = this.start_y - new_y;

      this.start_x = mouse.clientX;
      this.start_y = mouse.clientY;

      let model_pos_x = (this.model.offsetLeft - this.change_x);
      let model_pos_y = (this.model.offsetTop - this.change_y);

      if (model_pos_x > this.parent_bound_left && model_pos_x + this.model_width < this.parent_bound_right) {
        this.model.style.left = model_pos_x + 'px';
      }

      if (model_pos_y > this.parent_bound_top) {
        this.model.style.top = model_pos_y + 'px';
      }
    },
    mouseDragPreview(mouse) {
      const new_x = mouse.clientX;
      const new_y = mouse.clientY;
      
      this.change_x = this.start_x - new_x;
      this.change_y = this.start_y - new_y;

      this.start_x = mouse.clientX;
      this.start_y = mouse.clientY;

      this.model.style.left = (this.model.offsetLeft - this.change_x) + 'px';
      this.model.style.top = (this.model.offsetTop - this.change_y) + 'px';
    },
    mouseStop() {
      document.onmouseup = null;
      document.onmouseleave = null;
      document.onmousemove = null;
      console.log("stopped");
      this.$emit("update:previewModel", null);
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
    font-size: 1rem;
    cursor: move;

    &.class {
      border-left: 7px solid $blue;

      .type-name {
        color: $blue;
      }
    }
    &.class-instance {
      border-left: 7px solid $purple;

      .type-name {
        color: $purple;
      }
    }
    &.function {
      border-left: 7px solid $green;

      .type-name {
        color: $green;
      }
    }

    .model-header {
      font-weight: 600;
      padding: 5px 15px;
    }
  }
</style>
