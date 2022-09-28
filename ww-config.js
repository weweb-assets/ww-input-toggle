export default {
    editor: {
        label: {
            en: 'Toggle',
            fr: 'Toggle',
        },
        icon: 'fontawesome/solid/toggle-on',
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        value: {
            label: {
                en: 'Init value',
            },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines the initial value: `true | false`',
            },
            /* wwEditor:end */
        },
        required: {
            label: 'Required',
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is required: `true | false`',
            },
            /* wwEditor:end */
        },
        selectorSize: {
            type: 'Length',
            label: {
                en: 'Selector size',
                fr: 'Taille du selecteur',
            },
            options: {
                unitChoices: [{ value: '%', label: '%', min: 10, max: 100 }],
            },
            defaultValue: '100%',
        },
        selectorColorOff: {
            type: 'Color',
            label: {
                en: 'Selector color (off)',
                fr: 'Couleur du selecteur (off)',
            },
            options: {
                nullable: true,
                gradient: true,
            },
        },
        selectorColorOn: {
            type: 'Color',
            label: {
                en: 'Selector color (on)',
                fr: 'Couleur du selecteur (on)',
            },
            options: {
                nullable: true,
                gradient: true,
            },
        },
        backgroundColorOff: {
            type: 'Color',
            label: {
                en: 'Background color (off)',
                fr: 'Couleur de fond (off)',
            },
            options: {
                nullable: true,
                gradient: true,
            },
        },
        backgroundColorOn: {
            type: 'Color',
            label: {
                en: 'Background color (on)',
                fr: 'Couleur de fond (on)',
            },
            options: {
                nullable: true,
                gradient: true,
            },
        },
        toggleState: {
            type: 'Button',
            options: {
                text: { en: 'Toggle state', fr: 'Toggle state' },
                color: 'blue',
                action: 'toggleValue',
            },
            editorOnly: true,
        },
    },
};
