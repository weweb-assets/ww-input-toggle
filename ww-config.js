export default {
    options: {
    },
    editor: {
        "label": {
            "en": "Search bar",
            "fr": "Search bar"
        },
        icon: 'fontawesome/solid/search'
    },
    properties: {
        variable: {
            label: {
               en: 'Associated variable',
            },
            type: 'Variable',
            options: {
                type: 'String',
            },
            defaultValue: null,
        },
        submitEvent: {
            label: {
                "en": "Font weight",
                "fr": "Graisse"
            },
            type: "TextSelect",
            options: {
                options: [
                    { "value": null, "label": { "en": "Default", "fr": "Par défaut" } },
                    { "value": 100, "label": { "en": "100 - Thin" } },
                ]
            }
        }
    }
}
