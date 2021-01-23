import wwHandleIframe from './wwHandleIframe.vue';
wwLib.wwPopups.addPopup('wwHandleIframe', wwHandleIframe);

import './stories';

export async function openIframePopup(options) {
    try {
        return await wwLib.wwPopups.open({
            firstPage: 'WWIFRAME_SOURCE',
            data: {
                options,
            },
        });
    } catch (error) {
        return null;
    }
}
