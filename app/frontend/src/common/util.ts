import html2canvas from 'html2canvas';

// html2canvasを使用してキャプチャーを取得し、共有する
export function handleCapture() {
    const L_CAPTURE_SELECTOR = '.l-common';
    const element = document.querySelector(L_CAPTURE_SELECTOR) as HTMLElement
    html2canvas(element, {
        useCORS: true
    }).then(canvas => {
        const dataURL = canvas.toDataURL("image/png");
        const blob = toBlob(dataURL);
        if (blob) {
            const imageFile = new File([blob], "image.png", {
                type: "image/png",
            });
            if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
                navigator.share({
                    text: "共有",
                    files: [imageFile],
                }).then(() => {
                    console.log("success.");
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = "image.png";
                link.click();
            }
        }
    });
}
function toBlob(base64: string): Blob | null {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
        buffers[i] = decodedData.charCodeAt(i);
    }
    try {
        const blob = new Blob([buffers.buffer], {
            type: "image/png",
        });
        return blob;
    } catch (e) {
        console.log(e);
        return null;
    }
}