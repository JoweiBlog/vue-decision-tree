<template>
  <div
    class="vue-decision-tree-node"
    ref="node"
    :class="[
      direction,
      {
        leaf: node.isLeaf,
        root: node.level === 1,
        alone: node.noSiblings
      }
    ]"
    :style="nodeStyle"
  >
    <!-- conn-line -->
    <div class="vue-decision-tree-node-line" :style="lineStyle"></div>

    <div class="vue-decision-tree-node-content" :style="contentStyle">
      <div class="vue-decision-tree-node-sub-line" :style="lineStyle"></div>
      <node-content :node="node"></node-content>
    </div>

    <div class="vue-decision-tree-node-children">
      <decision-node
        :render-content="renderContent"
        v-for="child in node.childNodes"
        :key="child.key"
        :node="child"
        :props="props"
        :direction="direction"
        :h-spacing="hSpacing"
        :v-spacing="vSpacing"
        :line-color="lineColor"
      >
      </decision-node>
    </div>
  </div>
</template>

<script type="text/jsx">
export default {
  name: "DecisionNode",
  props: {
    node: {
      default: () => ({})
    },
    props: {},
    direction: { default: 'ltr' },
    renderContent: Function,
    hSpacing: { default: 16 },
    vSpacing: { default: 48 },
    lineColor: { default: "#000" },
  },
  computed: {
    hspace() {
      return this.hSpacing / 2;
    },
    vspace() {
      return this.vSpacing / 2;
    },
    vertical() {
      return ['ttb', 'btt'].includes(this.direction)
    },
    horizontal() {
      return ['ltr', 'rtl'].includes(this.direction)
    },
    lineStyle() {
      let style = { color: this.lineColor }

      if (this.horizontal) {
        style.width = `${this.hspace}px`
      } else {
        style.height = `${this.vspace}px`
      }

      return style
    },
    nodeStyle() {
      let style = {}

      if (this.horizontal) {
        style.paddingTop = `${this.vspace}px`
        style.paddingBottom = `${this.vspace}px`
      } else {
        style.paddingLeft = `${this.hspace}px`
        style.paddingRight = `${this.hspace}px`
      }

      return style
    },
    contentStyle() {
      let style = {}

      if (this.horizontal) {
        style.paddingLeft = `${this.hspace}px`
        style.paddingRight = `${this.hspace}px`
      } else {
        style.paddingTop = `${this.vspace}px`
        style.paddingBottom = `${this.vspace}px`
      }

      return style
    }
  },
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      // eslint-disable-next-line no-unused-vars
      render(h) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const { data } = node;
        return tree.$scopedSlots.default ? (
          tree.$scopedSlots.default({ node, data })
        ) : (
          <span>{ node.label || '' }</span>
        );
      }
    }
  },
  data() {
    return {
      tree: null
    };
  },
  methods: {},
  created() {
    const parent = this.$parent;

    if (parent.isRoot) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
  },
};
</script>
<style lang="scss">
@import "./node.scss";
</style>
