<template>
  <div class="da-steps">
    <div class="step"
      :class="{
        current: active === index + 1,
        done: active > index + 1
      }"
      v-for="(step, index) in $slots.step"
    >
      <vnode :node="step" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      active: {
        type: Number,
        default () {
          return 1
        }
      }
    },
    components: {
      vnode: {
        functional: true,
        render(h, context) {
          let node = context.props.node
          node.data.staticClass ?
            node.data.staticClass += ' step-text':
            node.data.attrs['class'] = 'step-text'
          return node
        }
      }
    }
  }
</script>

<style lang="scss">
.da-steps {
  display: flex;
  .step {
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    color: #3f3f3f;
    cursor: default;
    margin: 0 10px;
    padding: 8px 10px 8px 30px;
    flex: 1;
    position: relative;
    background-color: #fdebe7;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background-color 0.2s ease;
    &:after, &:before {
      content: " ";
      position: absolute;
      top: 0;
      right: -17px;
      width: 0;
      height: 0;
      border-top: 19px solid transparent;
      border-bottom: 19px solid transparent;
      border-left: 17px solid #fdebe7;
      z-index: 2;
      transition: border-color 0.2s ease;
    }
    &:before {
      right: auto;
      left: 0;
      border-left: 17px solid #fff;
      z-index: 0;
    }
    &:first-child:before {
      border: none;
    }
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      margin-left: 0px;
    }
    &:last-child:after {
      border: none;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      margin-right: 0px;
    }
    .step-text {
      position: relative;
      color: #919191;
    }
    .step-text:before {
      opacity: 0;
      content: "\2714";
      color: #659f13;
      position: absolute;
      top: -2px;
      left: -20px;
    }
    &.done .step-text:before {
      opacity: 1;
      -webkit-transition: opacity 0.3s ease 0.5s;
      -moz-transition: opacity 0.3s ease 0.5s;
      -ms-transition: opacity 0.3s ease 0.5s;
      transition: opacity 0.3s ease 0.5s;
    }
    &.current {
      font-weight: bold;
      background-color: #f05940;
      .step-text {
        color: #fff;
      }
    }
    &.current:after {
      border-left: 17px solid #f05940;
    }
  }
}


</style>