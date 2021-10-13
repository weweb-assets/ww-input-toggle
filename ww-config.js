export default {
    editor: {
        label: {
            en: 'Search bar',
            fr: 'Search bar',
        },
        icon: 'fontawesome/solid/search',
    },
    properties: {
        submitEvent: {
            label: {
                en: 'Submit event',
                fr: 'Evenement de soumission',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'debounce', label: { en: 'On change' } },
                    { value: 'button', label: { en: 'Button' } },
                ],
            },
            responsive: true,
            bindable: true,
            defaultValue: 'debounce',
        },
        debounceDelay: {
            type: 'Length',
            label: {
                en: 'Delay',
                fr: 'Délai',
            },
            options: {
                unitChoices: [{ value: 'ms', label: 'ms', min: 1, max: 5000 }],
            },
            defaultValue: '500ms',
        },
        buttonPosition: {
            hidden: content => content.submitEvent !== 'button',
            label: {
                en: 'Button position',
                fr: 'Position du bouton',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'right', label: { en: 'Right' } },
                    { value: 'left', label: { en: 'Left' } },
                    { value: 'top', label: { en: 'Top' } },
                    { value: 'bottom', label: { en: 'Bottom' } },
                ],
            },
            responsive: true,
            defaultValue: 'right',
        },
        enterKey: {
            type: 'OnOff',
            label: {
                en: 'Submitting by pressing enter',
                fr: 'Submitting by pressing enter',
            },
            defaultValue: true,
        },
        variable: {
            label: {
                en: 'Associated variable',
            },
            type: 'Variable',
            options: {
                type: 'String',
            },
            bindable: true,
            defaultValue: null,
        },
        submitButton: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-button' },
        },
    },
};
