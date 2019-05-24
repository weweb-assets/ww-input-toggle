<template>
    <div class="ww-iframe">
        <div v-if="!source" class="placeholder">Iframe</div>
        <div class="content" v-html="source"></div>
    </div>
</template>
 

<script>			
import Vue from 'vue';

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
            reset: false
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        editMode() {
            return this.wwObjectCtrl.getEditMode() == 'CONTENT'
        },
        source() {
            return this.reset ? "" : (this.wwObject.content.data.source || null)
        },
        script() {
            return this.wwObject.content.data.script || null
        },
        javascript() {
            return this.wwObject.content.data.javascript || null
        }
    },
    watch: {
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

        async loadScript() {
            await wwLib.wwUtils.addScriptToHead(this.script);
        },

        loadJavascript() {
            try {
                eval(this.javascript)
            } catch (error) {
                console.error(error, "error");
            }
        },
        reinit() {
            this.reset = true
            this.$nextTick(() => {
                this.reset = false

                this.init()


            })
        },
        /* wwManager:start */
        async edit() {
            wwLib.wwObjectHover.setLock(this);
            let editList = {
                WWIFRAME_SOURCE: {
                    title: {
                        en: 'Add iframe source',
                        fr: 'Ajouter la source de l\'iframe'
                    },
                    desc: {
                        en: 'Copy Paste the content',
                        fr: 'Copier Coller le contenu'
                    },
                    icon: 'wwi wwi-config',
                    shortcut: 'c',
                    next: 'WWIFRAME_SOURCE'
                }
            }

            wwLib.wwPopups.addStory('WWIFRAME_EDIT', {
                title: {
                    en: 'Edit iframe',
                    fr: 'Editer l\'iframe '
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList
                }
            })

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
                                en: 'Script (optional):',
                                fr: 'Script (optionnel) :'
                            },
                            type: 'text',
                            key: 'script',
                            valueData: 'script',
                            desc: {
                                en: 'URL to the script that will be loaded with the iFrame',
                                fr: 'Url du script qui sera chargé avec l\'iFrame'
                            },
                        },
                        {
                            label: {
                                en: 'Javascript (optional):',
                                fr: 'Javascript (optionnel) :'
                            },
                            type: 'textarea',
                            key: 'javascript',
                            valueData: 'javascript',
                            desc: {
                                en: 'Javascript that will be executed with the iFrame',
                                fr: 'Javascript qui sera executé avec l\'iFrame'
                            },
                            style: {
                                height: '200px'
                            }
                        },
                        {
                            label: {
                                en: 'Source :',
                                fr: 'Source'
                            },
                            type: 'textarea',
                            key: 'source',
                            valueData: 'source',
                            desc: {
                                en: 'This content will be added to the section',
                                fr: 'Le contenu sera ajouter à la section'
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
            })

            let options = {
                firstPage: 'WWIFRAME_EDIT',
                data: {
                    wwObject: this.wwObject,
                    source: this.wwObject.content.data.source,
                    script: this.wwObject.content.data.script,
                    javascript: this.wwObject.content.data.javascript
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options);
                console.log('RESULT : ', result)

                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.source) != 'undefined') {
                    this.wwObject.content.data.source = result.source;
                }
                if (typeof (result.script) != 'undefined') {
                    this.wwObject.content.data.script = result.script;
                }
                if (typeof (result.javascript) != 'undefined') {
                    this.wwObject.content.data.javascript = result.javascript;
                }

                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
                this.reinit()
            } catch (error) {
                console.log(error);
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    mounted() {
        this.init();

        this.$emit('ww-loaded', this);
        window.addEventListener("resize", this.reinit)
    },
    beforeDestroyed() {
        window.removeEventListener("resize", this.reinit)
        //window.removeEventListener('resize', this.wwOnResize);
    }
};
</script>

<style lang="scss" scoped>
.ww-iframe {
    position: relative;
    width: 100%;
    height: 100%;
    .placeholder {
        width: 100%;
        height: 30px;
        background-color: #e4e4e4;
        text-align: center;
    }
    .content {
        min-height: 20px;
    }
    iframe {
        width: 100%;
    }
}
</style>
