export default {
    "options": {
        "sizable": true
    },
    "editor": {
        "label": {
            "en": "iFrame",
            "fr": "iFrame"
        },
        icon: 'fontawesome/regular/window-maximize'
    },
    properties: {
        source: {
            label: {
                en: 'iFrame source'
            },
            type: "Textarea",
            "options": {
                "row": 20
            },
            defaultValue: '',
        },
        changeSource: {
            type: 'Button',
            editorOnly: true,
            "options": {
                "text": { "en": "Edit iFrame source", "fr": "Editer la source iFrame" },
                "action": "editIFrame"
            }
        }
    }
}
