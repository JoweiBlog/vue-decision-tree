<template>
  <div id="app">
    <div>
      hSpacing:
      <input type="range" v-model="hSpacing" />
    </div>
    <div>
      vSpacing:
      <input type="range" v-model="vSpacing" />
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
      lineColor: "#000",
      colors: ["#000", "#00f", "#0f0", "#f00"]
    };
  }
};
</script>
