import wwHandleHTML from './wwHandleHTML.vue';
wwLib.wwPopups.addPopup('wwHandleHTML', wwHandleHTML);

import './stories';

export async function openHTMLPopup(options) {
    try {
        return await wwLib.wwPopups.open({
            firstPage: 'WWHTML_SOURCE',
            data: {
                options,
            },
        });
    } catch (error) {
        return null;
    }
}
