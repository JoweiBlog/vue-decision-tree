<template>
  <div class="decision-tree" ref="tree">
    <decision-node
      v-for="child in root.childNodes"
      :node="child"
      :props="props"
      :key="child.key"
      :direction="direction"
      :h-spacing="hSpacing"
      :v-spacing="vSpacing"
      :line-color="lineColor"
      :render-content="renderContent"
    >
    </decision-node>
  </div>
</template>

<script>
import NodeModel from "./nodeModel";
import DecisionNode from "./Node";

export default {
  name: "DecisionTree",
  components: {
    DecisionNode
  },
  data() {
    return {
      root: []
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    renderContent: Function,
    direction: {
      type: String,
      default: "ltr",
      validator: function(value) {
        return ["ltr", "rtl", "ttb", "btt"].includes(value);
      }
    },
    hSpacing: { type: Number, default: 16 },
    vSpacing: { type: Number, default: 48 },
    lineColor: { type: String, default: "#000" },
    props: {
      default() {
        return {
          children: "children",
          label: "label"
        };
      }
    }
  },
  methods: {},
  mounted() {
    this.isRoot = true;
    this.root = new NodeModel({
      data: this.data,
      props: this.props
    });
  }
};
</script>
