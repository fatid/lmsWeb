<template>
<node-view-wrapper class="tiptap-kv-image-container" >
    <node-view-content class="content" />
<!--         
         <img :src="src" /> -->
         <div class="tiptap-content"  v-bind:style="{'height':'300px'}" :height="height" >
                <vue-draggable-resizable :w="width" :h="height" @resizestop="onResize" :draggable="false" :lock-aspect-ratio="true">
                    <div :style="`background-image:url('${src}');background-size:cover;background-repeat:no-repeat;position:absolute;top:0;left:0;right:0;bottom:0;`"></div>
                </vue-draggable-resizable>  
         </div>
 
    </node-view-wrapper>
</template>
<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";
 
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
export default {
 
    components: {
        'vue-draggable-resizable': VueDraggableResizable,
        NodeViewWrapper,
        NodeViewContent,
    },
     props: nodeViewProps,
    computed: {
        src: {
            get() {
                return this.node.attrs.src;
            },
            set(src) {
                this.updateAttrs({src});
            }
        },
        width: {
            get() {
                return parseInt(this.node.attrs.width);
            },
            set(width) {
                this.updateAttrs({
                    width: width
                });
            }
        },
        height: {
            get() {
                return parseInt(this.node.attrs.height);
            },
            set(height) {
                this.updateAttrs({
                    height: height
                });
            }
        }
    },
    methods: {
        onResize(x, y, width, height) {
            this.width = width;
            this.height = height;
        }
    }
}
</script>

<style lang="scss">
.tiptap-kv-image-container{
    position: relative;
}
.tiptap-content{
    position: relative;

}
</style>