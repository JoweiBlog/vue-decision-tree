<template>
  <div id="app">
    <decision-tree :tree="mockData"></decision-tree>
  </div>
</template>

<script>
import MockData from './mockdata'
import DecisionTree from './components/DecisionTree'

export default {
  name: 'app',
  components: {
    DecisionTree
  },
  data() {
    return {
      mockData: MockData
    }
  }
}
</script>
