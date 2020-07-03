<template>
    <div class="ww-iframe">
        <iframe v-if="source && iframeSource" ref="iframe" :srcdoc="source" frameborder="0"></iframe>
        <!-- wwManager:start -->
        <div v-else class="placeholder">Iframe: click me to add code</div>
        <!-- wwManager:end -->
    </div>
</template>

<script>
export default {
    name: '__COMPONENT_NAME__',
    props: {
        wwObjectCtrl: Object,
        wwAttrs: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            reset: false,
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        source() {
            if (this.reset) return null;
            return this.wwObject.content.data.source ? '<span></span>' + this.wwObject.content.data.source : null;
        },
        iframeSource() {
            if (this.reset) return null;
            let src = (this.wwObject.content.data.source || '').trim();
            if (src.indexOf('<iframe') === 0) {
                return src;
            }
            return null;
        },
        script() {
            return this.wwObject.content.data.script || null;
        },
        javascript() {
            return this.wwObject.content.data.javascript || null;
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
            iframe.style.height = (iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight) + 'px';
        },
        /* wwManager:start */
        async edit() {
            wwLib.wwObjectHover.setLock(this);
            let editList = {
                WWIFRAME_SOURCE: {
                    separator: {
                        en: 'Configuration',
                        fr: 'Configuration',
                    },
                    title: {
                        en: 'Add iframe source',
                        fr: "Ajouter la source de l'iframe",
                    },
                    desc: {
                        en: 'Copy Paste the content',
                        fr: 'Copier Coller le contenu',
                    },
                    icon: 'wwi wwi-config',
                    shortcut: 'c',
                    next: 'WWIFRAME_SOURCE',
                },
            };

            wwLib.wwPopups.addStory('WWIFRAME_EDIT', {
                title: {
                    en: 'Edit iframe',
                    fr: "Editer l'iframe ",
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList,
                },
            });

            wwLib.wwPopups.addStory('WWIFRAME_SOURCE', {
                title: {
                    en: 'Copy Paste the content',
                    fr: 'Copier Coller le contenu',
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
                        {
                            label: {
                                en: 'Source :',
                                fr: 'Source',
                            },
                            type: 'textarea',
                            key: 'source',
                            valueData: 'source',
                            desc: {
                                en: 'This content will be added in the element',
                                fr: "Le contenu sera ajouter à l'élément",
                            },
                            style: {
                                height: '600px',
                            },
                        },
                    ],
                },
                buttons: {
                    NEXT: {
                        text: {
                            en: 'Finish',
                            fr: 'Terminer',
                        },
                        next: null,
                    },
                },
            });

            let options = {
                firstPage: 'WWIFRAME_EDIT',
                data: {
                    wwObject: this.wwObject,
                    source: this.wwObject.content.data.source,
                    script: this.wwObject.content.data.script,
                    javascript: this.wwObject.content.data.javascript,
                },
            };

            try {
                const result = await wwLib.wwPopups.open(options);

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof result.source != 'undefined') {
                    this.wwObject.content.data.source = result.source;
                    this.initIframe();
                }
                if (typeof result.script != 'undefined') {
                    this.wwObject.content.data.script = result.script;
                }
                if (typeof result.javascript != 'undefined') {
                    this.wwObject.content.data.javascript = result.javascript;
                }

                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
                this.reinit();
            } catch (error) {
                wwLib.wwLog.error(error);
            }
            wwLib.wwObjectHover.removeLock();
        },
        /* wwManager:end */
    },
    mounted() {
        this.init();

        this.$emit('ww-loaded', this);
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
