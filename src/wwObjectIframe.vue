<template>
    <div class="ww-iframe" :style="c_style">
        <iframe v-if="source" ref="iframe" :srcdoc="source" frameborder="0"></iframe>
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
            default: {}
        }
    },
    data() {
        return {
            reset: false,
            d_el: undefined
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        c_style() {
            if (!this.d_el) return {};

            this.wwObject.content.data.style = this.wwObject.content.data.style || {};
            let styles = {};
            styles.background = this.wwObject.content.data.backgroundColor || 'transparent';
            styles.backgroundImage = this.wwObject.content.data.gradient || '';
            styles.paddingBottom = this.wwAttrs.wwCategory == 'background' ? '' : Math.max(0, this.wwObject.ratio) + '%';

            //FORMAT
            styles.boxShadow = this.getShadow();

            //BORDER
            const w = this.$el.getBoundingClientRect().width;
            const unit = this.wwObject.content.data.style.borderRadiusUnit || '%';
            const borderRadius = (this.wwObject.content.data.style.borderRadius / (unit == '%' ? 2 : 1) || 0) + unit;
            styles.borderRadius = borderRadius;
            const borderWidth = this.wwObject.content.data.style.borderWidth ? this.wwObject.content.data.style.borderWidth : 0;
            styles.borderWidth = borderWidth + 'px';
            styles.borderColor = this.wwObject.content.data.style.borderColor || 'black';
            styles.borderStyle = this.wwObject.content.data.style.borderStyle || 'none';

            console.log('styles ! :', styles);

            return styles;
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
        }
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
        getShadow() {
            this.wwObject.content.data.style = this.wwObject.content.data.style || {};
            const shadow = this.wwObject.content.data.style.boxShadow || {};
            if (shadow.x || shadow.y || shadow.b || shadow.s || shadow.c) {
                return shadow.x + 'px ' + shadow.y + 'px ' + shadow.b + 'px ' + shadow.s + 'px ' + shadow.c;
            }
            return '';
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

            wwLib.wwPopups.addStory('WWIFRAME_EDIT', {
                title: {
                    en: 'Edit iframe',
                    fr: "Editer l'iframe "
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: {
                        WWIFRAME_SOURCE: {
                            separator: {
                                en: 'Configuration',
                                fr: 'Configuration'
                            },
                            title: {
                                en: 'Add iframe source',
                                fr: "Ajouter la source de l'iframe"
                            },
                            desc: {
                                en: 'Copy Paste the content',
                                fr: 'Copier Coller le contenu'
                            },
                            icon: 'wwi wwi-config',
                            shortcut: 'c',
                            next: 'WWIFRAME_SOURCE'
                        },
                        EDIT_STYLE: {
                            separator: {
                                en: 'Style',
                                fr: 'Style'
                            },
                            title: {
                                en: 'Change iframe style',
                                fr: "Changer l'apparence de l'iframe'"
                            },
                            desc: {
                                en: 'Size, shadow, ...',
                                fr: 'Taille, ombres, ...'
                            },
                            icon: 'wwi wwi-edit-style',
                            shortcut: 's',
                            next: 'WWIFRAME_STYLE'
                        }
                    }
                }
            });

            wwLib.wwPopups.addStory('WWIFRAME_STYLE', {
                title: {
                    en: 'Iframe style',
                    fr: "Style de l'iframe"
                },
                type: 'wwPopupWwObjectStyle',
                buttons: {
                    OK: {
                        text: {
                            en: 'Ok',
                            fr: 'Valider'
                        },
                        next: false
                    }
                }
            });

            wwLib.wwPopups.addStory('WWIFRAME_SOURCE', {
                title: {
                    en: 'Copy Paste the content',
                    fr: 'Copier Coller le contenu'
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
                        {
                            label: {
                                en: 'Source :',
                                fr: 'Source'
                            },
                            type: 'textarea',
                            key: 'source',
                            valueData: 'source',
                            desc: {
                                en: 'This content will be added in the element',
                                fr: "Le contenu sera ajouter à l'élément"
                            },
                            style: {
                                height: '600px'
                            }
                        }
                    ]
                },
                buttons: {
                    NEXT: {
                        text: {
                            en: 'Finish',
                            fr: 'Terminer'
                        },
                        next: null
                    }
                }
            });

            let options = {
                firstPage: 'WWIFRAME_EDIT',
                data: {
                    wwObject: this.wwObject,
                    source: this.wwObject.content.data.source,
                    script: this.wwObject.content.data.script,
                    javascript: this.wwObject.content.data.javascript
                }
            };

            try {
                const result = await wwLib.wwPopups.open(options);
                console.log('Result 🔥 :', result);
                console.log('Data styles 🚀 :', this.wwObject.content.data.style);

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/

                if (typeof result.borderColor != 'undefined') {
                    this.wwObject.content.data.style.borderColor = result.borderColor;
                }
                if (typeof result.borderRadius != 'undefined') {
                    this.wwObject.content.data.style.borderRadius = result.borderRadius;
                }
                if (typeof result.borderRadiusUnit != 'undefined') {
                    this.wwObject.content.data.style.borderRadiusUnit = result.borderRadiusUnit;
                }
                if (typeof result.borderStyle != 'undefined') {
                    this.wwObject.content.data.style.borderStyle = result.borderStyle;
                }
                if (typeof result.borderWidth != 'undefined') {
                    this.wwObject.content.data.style.borderWidth = result.borderWidth;
                }
                if (typeof result.boxShadow != 'undefined') {
                    this.wwObject.content.data.style.boxShadow = result.boxShadow;
                }
                if (typeof result.filter != 'undefined') {
                    this.wwObject.content.data.style.filter = result.filter;
                }
                if (typeof result.overlay != 'undefined') {
                    this.wwObject.content.data.style.overlay = result.overlay;
                }
                if (typeof result.ratio != 'undefined') {
                    this.wwObject.ratio = result.ratio;
                }
                if (typeof result.maxHeight != 'undefined') {
                    this.wwObject.content.data.style.maxHeight = result.maxHeight;
                }
                if (typeof result.minWidth != 'undefined') {
                    this.wwObject.content.data.style.minWidth = result.minWidth;
                }

                /*=============================================m_ÔÔ_m=============================================\
                  OPTIONS
                \================================================================================================*/
                if (typeof result.source != 'undefined') {
                    this.wwObject.content.data.source = result.source;
                    //console.log(result);
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
        }
        /* wwManager:end */
    },
    mounted() {
        this.init();

        wwLib.wwElementsStyle.applyAllStyles({
            wwObject: this.wwObject,
            lastWwObject: null,
            element: this.$el,
            noAnim: this.wwAttrs.wwNoAnim,
            noClass: false
        });

        this.d_el = this.$el;

        this.$emit('ww-loaded', this);
        window.addEventListener('resize', this.reinit);
    },
    beforeDestroyed() {
        window.removeEventListener('resize', this.reinit);
    }
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
