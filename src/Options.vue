<template>
  <div class="ops">
    <div class="item">
      <span class="label">水平间距:</span>
      <span class="input">
        <input type="range" min="0" max="100" v-model="_hSpacing" />
      </span>
    </div>
    <div class="item">
      <span class="label">垂直间距:</span>
      <span class="input">
        <input type="range" min="0" max="100" v-model="_vSpacing" />
      </span>
    </div>
    <div class="item">
      <span class="label">起始方向:</span>
      <span class="input">
        <span class="radio-item" v-for="pos in directions" :key="pos">
          <input
            type="radio"
            :id="pos"
            name="pos"
            v-model="_direction"
            :value="pos"
          />
          <label :for="pos">{{ pos }}</label>
        </span>
      </span>
    </div>
    <div class="item">
      <span class="label">线条颜色:</span>
      <span class="input">
        <span class="radio-item" v-for="color in colors" :key="color">
          <input
            type="radio"
            :id="color"
            name="color"
            v-model="_lineColor"
            :value="color"
          />
          <label :for="color">{{ color }}</label>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: {
    hSpacing: { default: 16, type: Number },
    vSpacing: { default: 40, type: Number },
    direction: { default: "ltr", type: String },
    lineColor: { default: "#000", type: String }
  },
  computed: {
    _hSpacing: {
      get: function() {
        return this.hSpacing;
      },
      set: function(v) {
        this.$emit("update:hSpacing", v * 1);
      }
    },
    _vSpacing: {
      get: function() {
        return this.vSpacing;
      },
      set: function(v) {
        this.$emit("update:vSpacing", v * 1);
      }
    },
    _direction: {
      get: function() {
        return this.direction;
      },
      set: function(v) {
        this.$emit("update:direction", v);
      }
    },
    _lineColor: {
      get: function() {
        return this.lineColor;
      },
      set: function(v) {
        this.$emit("update:lineColor", v);
      }
    }
  },
  data() {
    return {
      directions: ["ltr", "rtl", "ttb", "btt"],
      colors: ["#000", "#00f", "#0f0", "#f00"]
    };
  }
};
</script>
<style lang="scss" scoped>
.ops {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  padding: 12px 20px;
  box-sizing: border-box;
  background: #000;

  .item {
    padding: 2px 0;

    .label {
      display: inline-block;
      width: 90px;
      color: #ddd;
      font-size: 13px;
    }

    .radio-item {
      margin-right: 8px;
      font-size: 13px;
      color: #fff;
      input {
        margin-right: 8px;
      }
    }
  }
}
</style>
