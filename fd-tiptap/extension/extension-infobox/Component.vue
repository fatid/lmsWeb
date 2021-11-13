<template>
  <node-view-wrapper class="kv-pages-info-box">
    <node-view-content class="content" :class="node.attrs.status" />
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,
};
</script>
 <style lang="scss">
    @import url("../styles.scss");
 
  
 </style>