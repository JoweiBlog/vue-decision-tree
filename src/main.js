import Vue from "vue";
import App from "./App.vue";
import DecisionTree from "./components/DecisionTree";

Vue.config.productionTip = false;

Vue.use(DecisionTree);

new Vue({
  render: h => h(App)
}).$mount("#app");
