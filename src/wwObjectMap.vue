<template>
    <div class="ww-markdown">
        <div class="test" v-html="mark"></div>
    </div>
</template>
 

<script>			
import Vue from 'vue';
const markdowned = window.markdownit();

export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            content: "# Header 1\n\n ```\ncode\n```\n\n **bold text**\n\n`single backticks`",
            mark: ''
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        editMode() {
            return this.wwObjectCtrl.getEditMode() == 'CONTENT'
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.loaded = true
            this.renderMarkdown()
        },
        renderMarkdown() {
            this.mark = markdowned.render(this.content);
            console.log(this.mark)
        }
    },
    mounted() {
        this.init();

        wwLib.wwElementsStyle.applyAllStyles({
            wwObject: this.wwObject,
            lastWwObject: null,
            element: this.$el,
            noAnim: this.wwAttrs.wwNoAnim,
            noClass: false,
        });

        this.$emit('ww-loaded', this);

    },
    beforeDestroyed() {
        //window.removeEventListener('resize', this.wwOnResize);
    }
};
</script>

<style lang="scss" scoped>
.ww-markdown {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
