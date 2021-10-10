<template>
  <node-view-wrapper   class="info-component" contenteditable="true" :class="node.attrs.status"  > 
   
     <node-view-content contenteditable="true"  class="content" > Write something.</node-view-content> 
 
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-2'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent
  },

  props: nodeViewProps,

  methods: {
    increase() {
      this.updateAttributes({
        count: this.node.attrs.count + 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
 
.info-component {
  margin:  0;
  position: relative;
  padding: 1rem;
  border-radius: 0.3rem;
    
 
  position: relative;
  &.success {
      background: rgba(246, 248, 252, 0.25);  
    border: 1px solid rgba(27, 197, 189, 0.3);
    color: #1BC5BD;
  }
  &.warning{
     background: rgba(246, 248, 252, 0.25);  
    border: 1px solid rgba(255, 168, 0, 0.3);
    color: #FFA800;
  }
  &.info{
      background: rgba(246, 248, 252, 0.25); 
      border: 1px solid #CDD7E2;
      color: #465670;
  }
}
.content{
  line-height: 1.5;
  cursor:text ;
       margin: 0rem;
  padding: 0.5rem;
  border: 2px dashed #0D0D0D20;
  border-radius: 0.5rem;
}
</style>