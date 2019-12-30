import DecisionTree from "./Tree";

DecisionTree.install = function(Vue) {
  Vue.component(DecisionTree.name, DecisionTree);
};

export default DecisionTree;
