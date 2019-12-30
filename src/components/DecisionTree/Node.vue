<template>
  <div
    class="decision-tree-node"
    ref="node"
    :class="{
      leaf: node.isLeaf,
      root: node.level === 1,
      alone: node.noSiblings
    }"
    :style="{
      padding: hspace + 'px 0'
    }"
  >
    <!-- conn-line -->
    <div
      class="decision-tree-node-line"
      :style="{ width: vspace + 'px', color: lineColor }"
    ></div>

    <div class="decision-tree-node-children">
      <decision-node
        :render-content="renderContent"
        v-for="child in node.childNodes"
        :key="child.key"
        :node="child"
        :props="props"
        :h-spacing="hSpacing"
        :v-spacing="vSpacing"
        :line-color="lineColor"
      >
      </decision-node>
    </div>
    <div
      class="decision-tree-node-content"
      :style="{ padding: '0 ' + vspace + 'px' }"
    >
      <div
        class="decision-tree-node-sub-line"
        :style="{ width: vspace + 'px', color: lineColor }"
      ></div>
      <node-content :node="node"></node-content>
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
<style lang="scss" scoped>
.decision-tree-node {
  position: relative;
  display: flex;
  align-items: center;

  .decision-tree-node-line {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    bottom: 0;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      height: 50%;
      right: 0;
      border-style: solid;
    }

    &::before {
      top: 0;
      border-width: 0 0 1px 1px;
    }

    &::after {
      bottom: 0;
      border-width: 0 0 0 1px;
    }
  }

  &:first-of-type {
    > .decision-tree-node-line {
      &::before {
        border-width: 0 0 0 0;
      }

      &::after {
        bottom: -1px;
        border-width: 1px 0 0 1px;
        border-top-left-radius: 3px;
      }
    }
  }

  &:last-of-type {
    > .decision-tree-node-line {
      &::before {
        border-width: 0 0 1px 1px;
        border-bottom-left-radius: 3px;
      }

      &::after {
        border-width: 0 0 0 0;
      }
    }
  }

  &.alone {
    &:last-of-type {
      > .decision-tree-node-line {
        &::before {
          border-width: 0 0 1px 0;
          border-bottom-left-radius: 0;
        }

        &::after {
          border-width: 0 0 0 0;
        }
      }
    }
  }

  &.leaf {
    > .decision-tree-node-content {
      .decision-tree-node-sub-line {
        &::after {
          display: none;
        }
      }
    }
  }

  &.root {
    > .decision-tree-node-line {
      &::before,
      &::after {
        display: none;
      }
    }
  }
}

.decision-tree-node-content {
  position: relative;
  color: #000;

  .decision-tree-node-sub-line {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
    bottom: 0;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      border-bottom: 1px solid;
      box-sizing: border-box;
    }
  }
}
</style>
