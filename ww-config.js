export default {
    editor: {
        label: {
            en: 'Toggle',
            fr: 'Toggle',
        },
        icon: 'fontawesome/solid/toggle-on',
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { value: '' } }],
    properties: {
        name: {
            label: { en: 'Name', fr: 'Name' },
            type: 'Text',
            options: { placeholder: 'Name' },
            section: 'settings',
            defaultValue: 'Toggle',
        },
        variableId: {
            label: {
                en: 'Associated variable (Boolean)',
            },
            type: 'Variable',
            options: {
                type: ['Boolean'],
            },
            section: 'settings',
            bindable: true,
            defaultValue: null,
        },
        initialValue: {
            label: {
                en: 'Initial value',
            },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            hidden: content => content.variableId,
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
