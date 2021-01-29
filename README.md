# vue-decision-tree
🧐Simple decision tree / relationship tree component, for VueJS.

Mainly relies on CSS Flexible Box. See compatibility: https://caniuse.com/#search=Flexible

[Live demo here](https://joweiblog.github.io/vue-decision-tree/)

Install:

```bash
npm i vue-decision-tree -S
```

Use:

```vue
<template>
  <div>
    <decision-tree :data="mockData"/>
    
    <!-- <decision-tree
      :data="mockData"
      #default="{ node, data }"
    >
      <template>
        <span>{{ data.label }}</span>
      </template>
    </decision-tree> -->
  </div>
</template>

<script>
  import DecisionTree from 'vue-decision-tree'
  
  export default {
    components: { DecisionTree },

    data() {
      return {
        mockData: [
          {
            label: '1',
            children: [{ label: '12' }, { label: '13' }],
          },
        ],
      }
    },
  }
</script>
```

props
| Props | Type | Description                    |
| ------------- | --- | ------------------------------ |
| data      | `Array` | data      |
| hSpacing   | `Number`| horizontal spacing, defaults to 16 (px)    |
| vSpacing   | `Number`| vertical spacing, defaults to 48 (px)   |
| lineColor   | `String`|  defaults to #000     |
| direction   | `String` | options: ltr / rtl / ttb / btt, defaults to ltr     |
| props   | `Object` | defaults to { children: 'children', label: 'label' }     |
  
slot
| Props | Description                    |
| ------------- | ------------------------------ |
| `-`     | Custom content for the node, the scope parameter is { node, data }    |
  
