# ImageReaderMultiple Markdown

## ImageReaderMultiple Props

| props | type | required | default |
| :---- | :--- | :------: | :------ |
| id | String | true |  |
| value | Array | false | [ ] |
| width | String | false | '100%' |
| minHeight | String | false | '200px' |
| multiple | Boolean | false | false |

## 引入 sortablejs

```html
<script src="https://unpkg.com/sortablejs@1.4.2"></script>
```

## 指令 v-sortable

```javascript
Vue.directive('sortable', {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {})
  }
})
```