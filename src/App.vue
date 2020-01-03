<template>
  <div id="app">
    <!-- options -->
    <options
      :h-spacing.sync="hSpacing"
      :v-spacing.sync="vSpacing"
      :direction.sync="direction"
      :line-color.sync="lineColor"
    ></options>

    <decision-tree
      :data="mockData"
      :h-spacing="hSpacing * 1"
      :v-spacing="vSpacing * 1"
      :line-color="lineColor"
      :direction="direction"
      :props="{
        children: 'child'
      }"
      #default="{ node, data }"
    >
      <template>
        <span>{{ data.label }}</span>
      </template>
    </decision-tree>
  </div>
</template>

<script>
import Options from "./Options";
import MockData from "./mockdata";

export default {
  name: "app",
  components: { Options },
  data() {
    return {
      mockData: MockData,
      hSpacing: 46,
      vSpacing: 12,
      direction: "ltr",
      lineColor: "#000"
    };
  }
};
</script>
<style>
#app {
  padding: 80px 0 0 0;
}
</style>
