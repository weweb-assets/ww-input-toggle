import './stories';

export default async function openPopup({ source }) {
    try {
        return await wwLib.wwPopups.open({ firstPage: '', data: { source } });
    } catch (error) {
        wwLib.wwLog.error(error);
        return null;
    }
}
