# ImageReaderMultiple Markdown

| props | type | required | default |
| :---- | :--- | :------: | :------ |
| id | String | true |  |
| value | Array | false | [ ] |
| width | String | false | '100%' |
| minHeight | String | false | '200px' |
| multiple | Boolean | false | false |


Vue.directive('sortable', {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {})
  }
})