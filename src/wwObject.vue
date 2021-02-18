<template>
    <div class="ww-iframe" ref="iframe" :class="{ isEditing: isEditing }">
        <div v-if="source" class="iframe-holder" v-html="source"></div>
        <!-- wwManager:start -->
        <div v-else class="placeholder">Iframe - Edit source in settings</div>
        <!-- wwManager:end -->
    </div>
</template>

<script>
/* wwManager:start */
import { openIframePopup } from './popups';
/* wwManager:end */

export default {
    name: '__COMPONENT_NAME__',
    props: {
        /* wwEditor:start */
        wwEditorState: Boolean,
        /* wwEditor:end */
        content: Object,
    },
    wwDefaultContent: {
        source: '',
    },
    data() {
        return {
            reset: false,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwSectionHelper.EDIT_MODES.CONTENT;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        source() {
            if (this.reset) return null;
            return this.content.source ? this.content.source : null;
        },
        script() {
            return this.content.script || null;
        },
        javascript() {
            return this.content.javascript || null;
        },
    },

    methods: {
        async init() {
            if (this.script) {
                await this.loadScript();
            }
            if (this.javascript) {
                this.loadJavascript();
            }
        },
        async editIframe() {
            try {
                const result = await openIframePopup({
                    source: this.content.source,
                });
                this.$emit('update', { source: result.source });
                this.reinit();
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async loadScript() {
            await wwLib.wwUtils.addScriptToHead(this.script);
        },
        loadJavascript() {
            try {
                eval(this.javascript);
            } catch (error) {
                console.error(error, 'error');
            }
        },
        reinit() {
            this.reset = true;
            this.$nextTick(() => {
                this.reset = false;
                this.init();
            });
        },
    },
    mounted() {
        this.init();
        window.addEventListener('resize', this.reinit);
    },
    beforeDestroyed() {
        window.removeEventListener('resize', this.reinit);
    },
};
</script>

<style lang="scss" scoped>
.ww-iframe {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 10px;
    .iframe-holder {
        height: 100%;
    }
    // wwManager:start
    &.isEditing {
        pointer-events: none;
    }
    .placeholder {
        width: 100%;
        height: 100%;
        min-height: 300px;
        background-color: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ww-color-blue-500);
    }
    // wwManager:end
    iframe {
        position: relative;
        width: 100% !important;
        height: 100% !important;
    }
}
</style>

<style lang="scss">
.ww-iframe {
    iframe {
        width: 100%;
        height: 100%;
        border: 0;
    }
}
</style>
