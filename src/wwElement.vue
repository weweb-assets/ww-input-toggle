<template>
    <div class="ww-webapp-search" :style="cssVariables">
        <wwElement
            ref="searchInput"
            class="submitButton"
            v-bind="content.textInput"
            @input-change="handleInputChange"
        ></wwElement>
        <wwElement class="submitButton" v-bind="content.submitButton" @click="handleClick"></wwElement>
    </div>
</template>

<script>
export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
    },
    emits: ['update:content'],
    data() {
        return {
            debounce: null,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        cssVariables() {
            let flexDirection = 'row';
            if (this.content.buttonPosition === 'left' || this.content.buttonPosition === 'right') {
                if (this.content.buttonPosition === 'left') flexDirection = 'row-reverse';
                else flexDirection = 'row';
            } else {
                if (this.content.buttonPosition === 'top') flexDirection = 'column-reverse';
                else flexDirection = 'column';
            }

            return {
                '--container-direction': flexDirection,
            };
        },
    },
    mounted() {},
    methods: {
        handleInputChange(event) {
            console.log(event);
            // if (this.content.submitEvent !== 'debounce') return;

            // clearTimeout(this.debounce);
            // this.debounce = setTimeout(() => {
            //     this.updateVariableValue(event.target.value);
            // }, this.content.debounceDelay);
        },
        handleClick() {
            const value = this.$refs.searchInput.value;
            this.updateVariableValue(value);
        },
        getVariableValue() {
            if (!this.content.variable) return;
            return wwLib.wwVariable.getValue(this.content.variable);
        },
        updateVariableValue(value) {
            if (!this.content.variable) return;
            wwLib.wwVariable.updateValue(this.content.variable, value);
        },
    },
    beforeUnmounted() {},
};
</script>

<style lang="scss" scoped>
:root {
    --container-direction: row;
}
.ww-webapp-search {
    display: flex;
    flex-direction: var(--container-direction);
}
</style>
