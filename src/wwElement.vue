<template>
    <button
        type="button"
        class="ww-webapp-toggle"
        role="switch"
        :class="{ '-active': value }"
        :aria-checked="value"
        :style="cssVariables"
        @click="toggleValue"
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
    emits: ['update:content:effect', 'trigger-event'],
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
            },
        },
        cssVariables() {
            const unitValue = wwLib.wwUtils.getLengthUnit(this.content.selectorSize)[0];
            const securedValue = Math.min(Math.max(unitValue, 10), 100);
            const scale = securedValue / 100;
            const transitionAjustement = 100 - securedValue;

            return {
                '--selector-size': scale,
                '--transition-ajustement': `${transitionAjustement}%`,
                '--selector-color-off': this.content.selectorColorOff,
                '--selector-color-on': this.content.selectorColorOn,
                '--background-color': this.value ? this.content.backgroundColorOn : this.content.backgroundColorOff,
            };
        },
    },
    watch: {
        isEditing() {
            if (!this.isEditing) this.value = false;
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
};
</script>

<style lang="scss" scoped>
.ww-webapp-toggle {
    outline: none;
    padding: 0;
    box-sizing: content-box;
    position: relative;
    background-color: var(--background-color);
    border: inherit;
    border-radius: inherit;
    transition: inherit;
    height: inherit;
    width: inherit;

    .aspect-ratio-box {
        height: 0;
        overflow: hidden;
        padding-top: 591.44px / 1127.34px * 100%;
        background: white;
        position: relative;
    }
    .aspect-ratio-box-inside {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .selector {
        position: absolute;
        top: 0px;
        left: 0px;
        transform: scale3d(var(--selector-size), var(--selector-size), var(--selector-size));

        height: 100%;
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
