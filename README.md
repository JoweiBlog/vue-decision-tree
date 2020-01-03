# vue-decision-tree
🧐Simple decision tree / relationship tree component, for VueJS.

### # demo
 https://joweiblog.github.io/vue-decision-tree/

### # use

``` html
  <decision-tree
    :data="mockData"
    :h-spacing="48"
    :v-spacing="24"
    line-color="#000"
    direction="ltr"
  >
  </decision-tree>
```

### # props
| Props | Type | Description                    |
| ------------- | --- | ------------------------------ |
| data      | `Array` | data      |
| hSpacing   | `Number`| horizontal spacing, defaults to 16 (px)    |
| vSpacing   | `Number`| vertical spacing, defaults to 48 (px)   |
| lineColor   | `String`|  defaults to #000     |
| direction   | `String` | options: ltr / rtl / ttb / btt, defaults to ltr     |
  
