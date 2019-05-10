<template>
    <div class="ww-iframe">
        <div v-if="!source" class="placeholder">Iframe</div>
        <div v-html="source"></div>
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
            return this.wwObject.content.data.source || null
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.loaded = true
        },
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
                    source: this.wwObject.content.data.source
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

                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
            } catch (error) {
                console.log(error);
            }
            wwLib.wwObjectHover.removeLock();
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
    iframe {
        width: 100%;
    }
}
</style>
