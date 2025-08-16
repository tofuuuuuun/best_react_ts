import html2canvas from 'html2canvas';

// html2canvasを使用してキャプチャーを取得し、共有する
export function handleCapture() {
    const L_CAPTURE_SELECTOR = '.m-bestList__container';
    const element = document.querySelector(L_CAPTURE_SELECTOR) as HTMLElement
    html2canvas(element, {
        useCORS: true
    }).then(canvas => {
        const dataURL = canvas.toDataURL("image/png");
        const blob = toBlob(dataURL);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (blob) {
            const imageFile = new File([blob], "image.png", {
                type: "image/png",
            });


            if (isIOS) {
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.document.title = '画像を保存してください';

                    const style = newWindow.document.createElement('style');
                    style.textContent = `
                        body { margin: 0; padding: 20px; text-align: center; background: #000; color: #fff; font-family: Arial, sans-serif; }
                        img { max-width: 100%; height: auto; margin-top: 20px; border-radius: 8px; }
                        p { font-size: 16px; line-height: 1.5; }
                    `;
                    newWindow.document.head.appendChild(style);

                    const container = newWindow.document.createElement('div');

                    const instruction = newWindow.document.createElement('p');
                    instruction.classList.add('u-textM1');
                    instruction.textContent = '画像を長押しして「写真に追加」または「画像を保存」を選択してください';

                    const img = newWindow.document.createElement('img');
                    img.src = dataURL;
                    img.alt = 'BEST List';

                    container.appendChild(instruction);
                    container.appendChild(img);
                    newWindow.document.body.appendChild(container);
                } else {
                    alert("ポップアップがブロックされました。ポップアップを許可してもう一度お試しください。");
                }
                return;
            }
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