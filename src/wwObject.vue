<template>
    <div class="ww-iframe">
        <iframe v-if="source" ref="iframe" :srcdoc="source" frameborder="0"></iframe>
        <!-- wwManager:start -->
        <div v-else class="placeholder">Iframe: click me to add code</div>
        <!-- wwManager:end -->
    </div>
</template>

<script>
/* wwManager:start */
import openPopup from './popups';
/* wwManager:end */

export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
    },
    data() {
        return {
            reset: false,
        };
    },
    computed: {
        source() {
            if (this.reset) return null;
            return this.content.source ? '<span></span>' + this.content.source : null;
        },
        iframeSource() {
            if (this.reset) return null;
            let src = (this.content.source || '').trim();
            if (src.indexOf('<iframe') === 0) {
                return src;
            }
            return null;
        },
        script() {
            return this.content.script || null;
        },
        javascript() {
            return this.content.javascript || null;
        },
    },
    watch: {
        source() {
            this.reinit();
        },
    },
    methods: {
        async init() {
            this.initIframe();

            setTimeout(() => {
                this.updateIframeHeight();
            }, 700);

            if (this.script) {
                await this.loadScript();
            }
            if (this.javascript) {
                this.loadJavascript();
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
        initIframe() {
            if (!this.source) return;

            let iframe = this.$refs.iframe;
            if (!iframe) return;
            let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;

            // Update iframe height
            iframe.onload = () => {
                iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;

                // Check for iframe inside to wait for
                if (!iframeWin.document.body) return;

                const childIframe = iframeWin.document.querySelector('iframe');
                if (!childIframe) {
                    this.updateIframeHeight();
                    return;
                }

                const childIframeWin = childIframe.contentWindow || childIframe.contentDocument.parentWindow;
                if (childIframeWin.document.readyState == 'complete') {
                    this.updateIframeHeight();
                } else {
                    childIframe.onload = () => {
                        this.updateIframeHeight();
                    };
                }
            };

            /* wwManager:start */
            iframeWin.addEventListener('resize', () => {
                if (iframeWin.document.body) {
                    this.updateIframeHeight();
                }
            });
            /* wwManager:end */
        },
        updateIframeHeight() {
            let iframe = this.$refs.iframe;
            if (!iframe) return;
            let iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            iframe.style.height =
                (iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + 'px';
        },
        /* wwManager:start */
        async edit() {
            const update = await openPopup(this.content);
            if (update) {
                this.$emit('update', update);
            }
        },
        /* wwManager:end */
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
    // wwManager:start
    .placeholder {
        width: 100%;
        height: 50px;
        background-color: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    // wwManager:end
    iframe {
        width: 100%;
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
