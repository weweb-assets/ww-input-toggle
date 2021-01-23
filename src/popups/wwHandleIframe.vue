<template>
    <div class="ww-iframe-popup ww-scroll-bar">
        <textarea
            class="script__input ww-editor-input -textarea -large caption-m"
            rows="23"
            placeholder="Your iframe code"
            v-model="source"
            @input="setResult($event)"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: 'wwHandleIframe',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            source: undefined,
        };
    },
    methods: {
        setResult() {
            this.options.result.source = this.source;
        },
    },
    mounted() {
        this.source = this.options.data.options.source;
        this.setResult();
    },
};
</script>

<style scoped lang="scss">
.ww-iframe-popup {
    .script__input {
        width: 100%;
    }
}
</style>
