export function detectFileType(data: ArrayBuffer): string {
    const dataView = new DataView(data);
    // PDF: [25 50 44 46 2D]
    // ZIP: [50 4B 03 04], [50 4B 05 06], [50 4B 07 08]
    // GIF: [47 49 46 38 37 61], [47 49 46 38 39 61]
    // PNG: [89 50 4E 47 0D 0A 1A 0A]
    if (dataView.getUint8(0) === 0x25 && dataView.getUint8(1) === 0x50 && dataView.getUint8(2) === 0x44 && dataView.getUint8(3) === 0x46 && dataView.getUint8(4) === 0x2D) {
        return "PDF";
    } else if (dataView.getUint8(0) === 0x50 && dataView.getUint8(1) === 0x4b && dataView.getUint8(2) === 0x03 && dataView.getUint8(3) === 0x04 ||
               dataView.getUint8(0) === 0x50 && dataView.getUint8(1) === 0x4b && dataView.getUint8(2) === 0x05 && dataView.getUint8(3) === 0x06 ||
               dataView.getUint8(0) === 0x50 && dataView.getUint8(1) === 0x4b && dataView.getUint8(2) === 0x07 && dataView.getUint8(3) === 0x08) {
        return "ZIP";
    } else if (dataView.getUint8(0) === 0x47 && dataView.getUint8(1) === 0x49 && dataView.getUint8(2) === 0x46 && dataView.getUint8(3) === 0x38 && (dataView.getUint8(4) === 0x37 || dataView.getUint8(4) === 0x39) && dataView.getUint8(5) === 0x61) {
        return "GIF";
    } else if (dataView.getUint8(0) === 0x89 && dataView.getUint8(1) === 0x50 && dataView.getUint8(2) === 0x4E && dataView.getUint8(3) === 0x47 && dataView.getUint8(4) === 0x0D && dataView.getUint8(5) === 0x0A && dataView.getUint8(6) === 0x1A && dataView.getUint8(7) === 0x0A) {
        return "PNG";
    }
    return "UNKNOWN";
}
