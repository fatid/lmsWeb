import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'statusComponent',
  group: 'block',
  content: 'inline*',
  
  addAttributes() {
    return { 
      status:{
        default: 'info'
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'status-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['status-component', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})