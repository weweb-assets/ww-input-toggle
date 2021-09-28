export default {
    "options": {
        "sizable": true
    },
    "editor": {
        "label": {
            "en": "iframe",
            "fr": "iframe"
        },
        icon: 'fontawesome/regular/window-maximize'
    },
    properties: {
        source: {
            hidden: true,
            defaultValue: '',
        },
        changeSource: {
            type: 'Button',
            editorOnly: true,
            "options": {
                "text": { "en": "Iframe source", "fr": "Source de l'iframe" },
                "action": "editIframe"
            }
        }
    }
}
