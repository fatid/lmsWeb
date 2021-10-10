<template>
  <node-view-wrapper class="vue-component">
        Deneme {{nodeViewProps}}
          <el-alert
            title="success alert"
            type="success">
        </el-alert>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-2'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,

  data() {
    return {
      
    }
  },

  computed: { 
  },
}
</script>

<style lang="scss" scoped>
.vue-component {
  position: relative;

  select {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>