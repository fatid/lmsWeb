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
  //   .kv-pages-info-box {
  //   margin: 1rem 0;
  //   position: relative;
  //   .content {
  //     border-radius: 0.5rem;
  //     margin: 0rem;
  //     padding: 1rem;
  //     &.success {
  //       background: rgba(246, 248, 252, 0.25);
  //       border: 1px solid rgba(27, 197, 189, 0.3);
  //       color: #1bc5bd;
  //     }
  //     &.warning {
  //       background: rgba(246, 248, 252, 0.25);
  //       border: 1px solid rgba(255, 168, 0, 0.3);
  //       color: #ffa800;
  //     }
  //     &.info {
  //       background: rgba(246, 248, 252, 0.25);
  //       border: 1px solid #cdd7e2;
  //       color: #465670;
  //     }
  //   }
  // }
  
 </style>