<template>
    <div 
      ref="card" 
      @mousedown.prevent="mouseDown" 
      class="card">
        Drag me cholo yolo!
    </div>
</template>

<script>

export default {
  name: 'cardTemplate',
  props: {
    scaleLevel: Number,
  },
  data() {
    return {
      start_x: null,
      start_y: null,
      change_x: null,
      change_y: null,

      card: null,
      card_width: null,
      card_height: null,

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
    this.card = this.$refs.card;
    this.card_width = this.card.clientWidth;
    this.card_height = this.card.clientHeight;
    
    const parent = this.$parent.$refs.cardPool;
    const parentBounding = parent.getBoundingClientRect();
    this.parent_bound_left = parentBounding.left;
    this.parent_bound_right = parentBounding.right;
    this.parent_bound_top = parentBounding.top;
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
      document.onmousemove = this.mouseDrag;
    },
    mouseDrag(mouse) {
      const new_x = mouse.clientX;
      const new_y = mouse.clientY;

      if (new_x < this.parent_bound_left || new_x > this.parent_bound_right || new_y < this.parent_bound_top) return;
      
      this.change_x = this.start_x - new_x;
      this.change_y = this.start_y - new_y;

      this.start_x = mouse.clientX;
      this.start_y = mouse.clientY;

      let card_pos_x = (this.card.offsetLeft - this.change_x);
      let card_pos_y = (this.card.offsetTop - this.change_y);

      if (card_pos_x > this.parent_bound_left && card_pos_x + this.card_width < this.parent_bound_right) {
        this.card.style.left = card_pos_x + 'px';
      }

      if (card_pos_y > this.parent_bound_top) {
        this.card.style.top = card_pos_y + 'px';
      }
    },
    mouseStop() {
      document.onmouseup = null;
      document.onmouseleave = null;
      document.onmousemove = null;
    },
    getParentBound() {
      const parent = this.$parent.$refs.cardPool;
      const parentBounding = parent.getBoundingClientRect();
      this.parent_bound_left = parentBounding.left;
      this.parent_bound_right = parentBounding.right;
      this.parent_bound_top = parentBounding.top;
    }
  }
}
</script>

<style scoped>
  .card {
    position: absolute;
    left: 500px;
    top: 500px;
    cursor: pointer;
    display: inline-block;
    padding: 20px;
    background: lightskyblue;
  }
</style>
