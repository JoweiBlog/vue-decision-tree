<template>
  <div id="app">
    <div>
      hSpacing:
      <input type="range" min="0" max="100" v-model="hSpacing" />
    </div>
    <div>
      vSpacing:
      <input type="range" min="0" max="100" v-model="vSpacing" />
    </div>
    <div>
      position:
      <span v-for="ps in pos" :key="ps">
        <input
          type="radio"
          :id="ps"
          name="pos"
          v-model="position"
          :value="ps"
        />
        <label :for="ps">{{ ps }}</label>
      </span>
    </div>
    <div>
      lineColor:
      <span v-for="color in colors" :key="color">
        <input
          type="radio"
          :id="color"
          name="color"
          v-model="lineColor"
          :value="color"
        />
        <label :for="color">{{ color }}</label>
      </span>
    </div>

    <decision-tree
      :data="mockData"
      :h-spacing="hSpacing * 1"
      :v-spacing="vSpacing * 1"
      :line-color="lineColor"
      :position="position"
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
import MockData from "./mockdata";

export default {
  name: "app",
  data() {
    return {
      mockData: MockData,
      hSpacing: 16,
      vSpacing: 40,
      position: "ltr",
      lineColor: "#000",
      pos: ["ltr", "rtl", "ttb", "btt"],
      colors: ["#000", "#00f", "#0f0", "#f00"]
    };
  }
};
</script>
