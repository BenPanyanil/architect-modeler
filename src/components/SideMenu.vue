<template>
  <section class="side-menu">
    <section class="side-menu-section">
      <div class="program-objects">
        <span>Class +</span>
        <span>Class instance +</span>
        <span>Function +</span>
      </div>
    </section>

    <section class="side-menu-section">
      <span>Model preview</span>
      <div class="model-preview-container">
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      
    }
  },
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
  background: $grey_3;
  height: 100vh;
  min-width: 320px;
  padding: 10px 30px;
  color: $white;
  box-shadow: 1px 0 0 1px $grey_3;
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

.side-menu-section {
  padding: 30px 0px;
  border-bottom: 1px solid $grey_0;
  width: 100%;
}

.model-preview-container {
  margin-top: 10px;
  background: $grey_1;
  width: 100%;
  min-height: 300px;
}
</style>