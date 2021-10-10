
import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'imageComponent',

  group: 'block',
  editable: true,

  content: 'inline*',

//   parseDOM: [
//     {
//     tag: 'img[src]',
//     getAttrs: dom => ({
//         src: dom.getAttribute('src'),
//         title: dom.getAttribute('title'),
//         alt: dom.getAttribute('alt'),
//         height: dom.getAttribute('height') || 300,
//         width: dom.getAttribute('width') || 300
//     }),
//     },
// ],
// toDOM: (node) => {
//     return ['img', {
//         src: node.attrs.src,
//         height: node.attrs.height,
//         width: node.attrs.width,
//         alt: node.attrs.alt,
//         title: node.attrs.title
//     }, 0];
// },

  addAttributes() {
    return {
        src: {},
        alt: {
            default: null,
        },
        title: {
            default: null,
        },
        width: {
            default: 300,
        },
        height: {
            default: 300
        }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img',
      },
    ]
  },

  commands({ type }) {
            return attrs => (state, dispatch) => {
                const { selection } = state;
                const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
                const node = type.create(attrs);
                const transaction = state.tr.insert(position, node);
                dispatch(transaction);
            }
        },
    
        inputRules(context) {
            const { type } = context;
            return [
                nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
                    const [, alt, src, title, height, width] = match;
                    return {
                        src,
                        alt,
                        title,
                        height,
                        width
                    }
                }),
            ];
        },
 
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  }, 
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})



// import { Node , Plugin} from '@tiptap/core'
// import { nodeInputRule,Node , Plugin  } from '@tiptap/core'
// import TipTapImageComponent from './Component.vue';
// const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;



// export default class CustomImage extends Node {
//     get name() {
//         return 'image'
//     }

//     get schema() {
//         return {
//             inline: true,
//             attrs: {
//                 src: {},
//                 alt: {
//                     default: null,
//                 },
//                 title: {
//                     default: null,
//                 },
//                 width: {
//                     default: 300,
//                 },
//                 height: {
//                     default: 300
//                 }
//             },
//             group: 'inline',
//             content: 'inline*',
//             draggable: false,
//             parseDOM: [
//                 {
//                 tag: 'img[src]',
//                 getAttrs: dom => ({
//                     src: dom.getAttribute('src'),
//                     title: dom.getAttribute('title'),
//                     alt: dom.getAttribute('alt'),
//                     height: dom.getAttribute('height') || 300,
//                     width: dom.getAttribute('width') || 300
//                 }),
//                 },
//             ],
//             toDOM: (node) => {
//                 return ['img', {
//                     src: node.attrs.src,
//                     height: node.attrs.height,
//                     width: node.attrs.width,
//                     alt: node.attrs.alt,
//                     title: node.attrs.title
//                 }, 0];
//             },
//         }
//     }
//     commands({ type }) {
//         return attrs => (state, dispatch) => {
//             const { selection } = state;
//             const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
//             const node = type.create(attrs);
//             const transaction = state.tr.insert(position, node);
//             dispatch(transaction);
//         }
//     }

//     inputRules(context) {
//         const { type } = context;
//         return [
//             nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
//                 const [, alt, src, title, height, width] = match;
//                 return {
//                     src,
//                     alt,
//                     title,
//                     height,
//                     width
//                 }
//             }),
//         ];
//     }

//     get plugins() {
//         return [
//         new Plugin({
//             props: {
//                 handleDOMEvents: {
//                     drop(view, event) {
//                         // I don't want to allow this
//                         return false;
//                     }
//                 }
//             },
//         }),
//         ]
//     }

//     get view() {
//         return TipTapImageComponent;
//     }
// }