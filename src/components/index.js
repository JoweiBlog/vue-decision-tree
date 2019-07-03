import DecisionTree from './DecisionTree.vue'

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.component(DecisionTree.name, DecisionTree)
  }
}

export { DecisionTree }
