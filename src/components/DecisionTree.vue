<template>
  <ul class="group" :style="{ ...groupStyle }">
    <li
      v-for="v in trees"
      :key="v._sign"
      :class="'branch ' + (alone ? 'only' : '')"
      ref="branch"
      :style="{
        ...branchStyle,
        height: v._branchHeight,
        transform: 'translateY(' + v._branchTy + ')'
      }"
    >
      <a
        class="leaf"
        href="javascript:void(0);"
        :style="{
          ...leafStyle,
          transform: 'translateY(' + v._leafTy + ')'
        }"
      >
        <span
          class="l-thread"
          v-if="hasParent()"
          :style="{
            ...leftThreadStyle,
            height: v._branchHeight,
            top: v._threadTop
          }"
        ></span>
        <span class="content" :style="contentStyle">
          <span v-if="!v.render || !$options.components[v.render]">{{
            v.name || ''
          }}</span>
          <component
            :is="$options.components[v.render]"
            v-on="$listeners"
            :opt="emitOpt(v)"
          ></component>
        </span>
        <span
          class="r-thread"
          v-if="hasChild(v)"
          :style="rightThreadStyle"
        ></span>
      </a>

      <template v-if="(v.child || []).length > 0">
        <DecisionTree
          :ref="v._sign"
          :parent="v._sign"
          :tree="v.child"
          :maxWidth="maxWidth"
          :hSpacing="hSpacing"
          :vSpacing="vSpacing"
          :lineColor="lineColor"
          :index="nextI"
          v-on="$listeners"
          @height="onGetHeight"
        >
        </DecisionTree>
      </template>
    </li>
  </ul>
</template>
<script>
/**
 * decisionTree
 *
 * Attrs: 'child', 'name', 'render' are reserved fields.
 * @param {Array} tree data source [{..., [name], [child], [render]}]
 * --@param {Array} child, subset
 * --@param {String} name, display
 * --@param {String} render, render component name.
 *     render / props
 *     @param {Object} opt, current item
 *     --@param {Array} index, current item index
 *     --@param {Object} data, current item content
 *
 * @param {Number} maxWidth def: 96
 * @param {Number} hSpacing def: 48
 * @param {Number} vSpacing def: 8
 * @param {String} lineColor def: '#666'
 *
 * @event {Function} render $emit[evt]
 * eg:
 * render: { this.$emit('delete') }
 * app: <Comp @delete="onDelete" ..></Comp>
 *
 * @method matchAim
 * --@param {Array} ori, date source
 * --@param {Array} index
 * --@param {Boolean} parent, return the parent?, defaults to false
 *
 * */
export default {
  name: 'DecisionTree',
  components: {
    DecisionTree: () => import('./DecisionTree.vue')
  },
  computed: {
    groupStyle() {
      return this.index !== 0
        ? {
            marginLeft: topx(this.maxWidth + this.hSpacing / 2),
            paddingLeft: topx(this.hSpacing / 2)
          }
        : {}
    },
    branchStyle() {
      return { padding: topx(this.vSpacing / 2) + ' 0' }
    },
    leafStyle() {
      return { width: topx(this.hSpacing / 2 + this.maxWidth) }
    },
    contentStyle() {
      return { maxWidth: topx(this.maxWidth) }
    },
    leftThreadStyle() {
      return {
        width: topx(this.hSpacing / 2),
        left: topx(-(this.hSpacing / 2)),
        color: this.lineColor
      }
    },
    rightThreadStyle() {
      return {
        width: topx(this.hSpacing / 2),
        backgroundColor: this.lineColor
      }
    },
    alone() {
      return this.trees.length === 1
    }
  },
  data() {
    return {
      trees: [],
      nextI: (this.index || 0) + 1,
      childHeight: {}
    }
  },
  props: {
    tree: {
      type: Array,
      require: true,
      default: () => []
    },
    maxWidth: {
      type: Number,
      default: 96
    },
    hSpacing: {
      type: Number,
      default: 48
    },
    vSpacing: {
      type: Number,
      default: 8
    },
    lineColor: {
      type: String,
      default: '#666'
    },
    // col index, no need to set.
    index: {
      type: Number,
      default: 0
    },
    parent: {
      type: String,
      default: ''
    }
  },
  methods: {
    // tools
    matchAim(ori = [], index = [], parent = false) {
      let o = ori
      let res = {}
      while (index.length > (parent ? 1 : 0)) {
        res = o[index.shift()]
        o = res.child || []
      }
      return res
    },

    init() {
      const rms = Math.random()
        .toString(36)
        .substring(2)
      this.trees = this.tree.map((v, i) => ({
        ...v,
        // '_xx': private params
        _sign: `${this.parent ? `${this.parent}-` : ''}${rms}_${
          this.index
        }_${i}`,
        _leafTy: 0,
        _branchTy: 0,
        _branchHeight: 'auto',
        _threadTop: 0
      }))
    },
    emitOpt(item = {}) {
      let o = JSON.parse(JSON.stringify(item))
      const i = [...o._sign.split('-').map(i => i.split('_')[2] * 1)]
      for (const [k, v] of Object.entries(o)) {
        // filter private params
        if (/^\_./.test(k)) {
          // Reflect.deleteProperty(o, k)
          delete o[k]
        }
      }
      return {
        index: i,
        data: o
      }
    },
    hasChild(item = {}) {
      return !!(item.child || []).length
    },
    hasParent() {
      return this.index > 0
    },
    onGetHeight(e) {
      this.childHeight = {
        ...this.childHeight,
        ...e
      }
      this.updateTree()
    },
    updateTree() {
      const branch = this.$refs['branch'] || []
      let groupHeight = 0

      const unFinishedLoadChild = v => {
        const childLen = (v.child || []).length
        const finishedChild = Object.keys(this.childHeight).length
        return childLen && !finishedChild
      }

      for (let i = 0; i < this.trees.length; i++) {
        const item = this.trees[i]

        /**
         * Why must the subset be loaded ?
         *
         * Depentend subset DOM. usually it should be the case,
         * but if you used vue extends component,
         * it'll change the loading order of the cascading components.
         * */
        if (unFinishedLoadChild(item)) break

        const bh = (branch[i] || {}).clientHeight || 0
        const _bh = this.childHeight[item._sign] || 0

        this.$set(item, '_branchHeight', topx(_bh ? Math.max(bh, _bh) : bh))
        this.$set(item, '_leafTy', topx(_bh ? (_bh - bh) / 2 : 0))
        this.$set(item, '_branchTy', topx(_bh && bh > _bh ? (bh - _bh) / 2 : 0))
        this.$set(
          item,
          '_threadTop',
          topx((_bh && _bh > bh ? (bh - _bh) / 2 : 0) - this.vSpacing / 2)
        )
        groupHeight += Math.max(bh, _bh)
      }

      this.$emit('height', {
        [this.parent]: groupHeight
      })
    }
  },
  mounted() {
    this.updateTree()
  },
  watch: {
    tree: {
      handler: 'init',
      immediate: true,
      deep: true
    }
  }
}

// => px
function topx(n = 0) {
  return `${n}px`
}
</script>
<style lang="scss" scoped>
/* setting */
// line radius
$lineRadius: 3px;

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

.group {
  position: relative;

  .branch {
    position: relative;

    > .group {
      position: absolute;
      top: 0;
    }

    &.only {
      &:last-of-type {
        > .leaf .l-thread {
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

    &:first-of-type {
      > .leaf .l-thread {
        &::before {
          border-width: 0 0 0 0;
        }

        &::after {
          border-width: 1px 0 0 1px;
          border-top-left-radius: $lineRadius;
        }
      }
    }

    &:last-of-type {
      > .leaf .l-thread {
        &::before {
          border-width: 0 0 1px 1px;
          border-bottom-left-radius: $lineRadius;
        }

        &::after {
          border-width: 0 0 0 0;
        }
      }
    }
  }

  .leaf {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 3;

    .l-thread {
      position: absolute;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        height: 50%;
        width: 100%;
        border-style: solid;
      }

      &::before {
        top: 0;
        height: calc(50% - 1px);
        border-width: 0 0 1px 1px;
      }

      &::after {
        bottom: 0;
        height: calc(50% + 1px);
        border-width: 0 0 0 1px;
      }
    }

    .r-thread {
      position: relative;
      top: 50%;
      flex: 1;
      height: 1px;
      width: 100%;
    }

    .content {
      word-break: break-all;
      display: inline-block;
      padding: 2px;
      font-size: 12px;
      color: #000;
    }
  }
}
</style>
