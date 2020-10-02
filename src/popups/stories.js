wwLib.wwPopups.addStory('WWIFRAME_SOURCE', {
    title: {
        en: 'Copy Paste the content',
        fr: 'Copier Coller le contenu',
    },
    type: 'wwPopupForm',
    storyData: {
        fields: [
            {
                label: {
                    en: 'Source :',
                    fr: 'Source',
                },
                type: 'textarea',
                key: 'source',
                valueData: 'source',
                desc: {
                    en: 'This content will be added in the element',
                    fr: "Le contenu sera ajouter à l'élément",
                },
                style: {
                    height: '600px',
                },
            },
        ],
    },
    buttons: {
        NEXT: {
            text: {
                en: 'Finish',
                fr: 'Terminer',
            },
            next: null,
        },
    },
});
