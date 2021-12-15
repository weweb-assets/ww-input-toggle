<template>
    <button
        type="button"
        class="ww-webapp-toggle"
        role="switch"
        :class="{ '-active': value }"
        :aria-checked="value"
        :style="cssVariables"
        @click="toggleValue()"
    >
        <div class="selector" :class="{ '-active': value }"></div>
    </button>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['update:content:effect', 'trigger-event', 'add:state', 'remove:state'],
    setup(props) {
        const internalVariableId = computed(() => props.content.variableId);
        const variableId = wwLib.wwVariable.useComponentVariable(props.uid, 'value', false, internalVariableId);
        return { variableId };
    },
    data() {
        return {
            internalValue: false,
        };
    },
    watch: {
        internalValue: {
            handler(value) {
                this.$emit(value ? 'add:state' : 'remove:state', { state: 'toggled' });
            },
            imediate: true,
        },
        isEditing() {
            this.value = false;
        },
    },
    mounted() {
        if (this.content.initialValue !== undefined && !this.content.variableId) {
            this.value = !!this.content.initialValue;
        }
    },
    methods: {
        toggleValue() {
            this.value = !this.value;
        },
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value: {
            get() {
                if (!this.variableId) return this.internalValue;
                return wwLib.wwVariable.getValue(this.variableId);
            },
            set(value) {
                this.internalValue = value;
                this.$emit('trigger-event', { name: 'change', event: { value } });
                if (this.variableId) wwLib.wwVariable.updateValue(this.variableId, value);
                console.log(value);
            },
        },
        cssVariables() {
            const unitValue = wwLib.wwUtils.getLengthUnit(this.content.selectorSize)[0];
            const scale = unitValue / 100;
            const transitionAjustement = 100 - unitValue;

            return {
                '--selector-size': scale,
                '--transition-ajustement': `${transitionAjustement}%`,
                '--selector-color-off': this.content.selectorColorOff,
                '--selector-color-on': this.content.selectorColorOn,
            };
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-webapp-toggle {
    --ww-radio-transition: all 0.5s ease;
    --ww-radio-color-1: var(--ww-color-blue-500);
    --ww-radio-color-2: var(--ww-color-theme-dark-0);

    &:disabled {
        cursor: not-allowed;
        --ww-radio-color-1: var(--ww-color-theme-dark-300);
    }

    outline: none;
    padding: 0;
    box-sizing: content-box;
    position: relative;
    background-color: inherit;
    border: inherit;
    border-radius: inherit;
    transition: inherit;
    height: inherit;
    width: inherit;

    .selector {
        position: absolute;
        top: 0px;
        left: 0px;
        transform: scale3d(var(--selector-size), var(--selector-size), var(--selector-size));

        height: calc(100%);
        aspect-ratio: 1 / 1;

        background-color: var(--selector-color-off);
        border-radius: inherit;
        transition: inherit;
    }

    &.-active {
        .selector {
            transition: inherit;
            background-color: var(--selector-color-on);
            top: 0px;
            left: 100%;
            transform: scale3d(var(--selector-size), var(--selector-size), var(--selector-size))
                translateX(calc(-100% - var(--transition-ajustement)));
        }
    }
}
</style>
