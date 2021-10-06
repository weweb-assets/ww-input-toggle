import wwHandleIFrame from './wwHandleIFrame.vue';
wwLib.wwPopups.addPopup('wwHandleIFrame', wwHandleIFrame);

import './stories';

export async function openIFramePopup(options) {
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
