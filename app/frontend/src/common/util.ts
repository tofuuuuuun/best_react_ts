import html2canvas from 'html2canvas';

// html2canvasを使用してキャプチャーを取得し、共有する
export async function handleCapture(selector: string = '.l-common') {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");
    const blob = toBlob(dataURL);

    if (blob) {
        const imageFile = new File([blob], "image.png", { type: "image/png" });

        // Web Share API（画像ファイル共有）対応判定
        if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
            try {
                await navigator.share({
                    text: "共有",
                    files: [imageFile],
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            // フォールバック: ダウンロード
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = "image.png";
            link.click();
            // スマホの場合は「画像を長押しして保存・共有してください」と案内すると親切
        }
    }
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