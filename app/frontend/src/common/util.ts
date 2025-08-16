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

        if (blob) {
            const imageFile = new File([blob], "image.png", {
                type: "image/png",
            });
            const canShareFiles = navigator.canShare && navigator.canShare({ files: [imageFile] });

            if (canShareFiles) {
                navigator.share({
                    text: "共有",
                    files: [imageFile],
                }).then(() => {
                    console.log("success.");
                }).catch((error) => {
                    console.log("共有失敗:", error);
                });
            } else {
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                    showImageInNewTab(dataURL);
                } else {
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = "best-list.png";
                    link.click();
                }
            }
        }
    }).catch(error => {
        console.error("キャプチャに失敗しました:", error);
        showErrorMessage("画像の生成に失敗しました。もう一度お試しください。");
    });
}
function showImageInNewTab(dataURL: string) {
    try {
        const newWindow = window.open('', '_blank');
        if (!newWindow) {
            // ポップアップブロック時のフォールバック
            showErrorMessage("ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。");
            return;
        }

        newWindow.document.title = '画像を保存してください';

        const style = newWindow.document.createElement('style');
        style.textContent = `
            body { margin: 0; padding: 20px; text-align: center; background: #000; color: #fff; font-family: Arial, sans-serif; }
            img { max-width: 100%; height: auto; margin-top: 20px; border-radius: 8px; }
            p { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }
        `;
        newWindow.document.head.appendChild(style);

        const container = newWindow.document.createElement('div');

        const instruction = newWindow.document.createElement('p');
        instruction.innerHTML = `
            <strong>保存方法:</strong><br>
            タッチデバイス: 画像を長押しして保存<br>
            PC: 画像を右クリックして保存
        `;

        const img = newWindow.document.createElement('img');
        img.src = dataURL;
        img.alt = 'BEST List';

        container.appendChild(instruction);
        container.appendChild(img);
        newWindow.document.body.appendChild(container);
    } catch (error) {
        console.error("新しいタブでの画像表示に失敗:", error);
        showErrorMessage("画像の表示に失敗しました。ブラウザの設定を確認してください。");
    }
}
function showErrorMessage(message: string) {
    // 既存のエラー表示システムを利用（例：ErrorMessage コンポーネント）
    console.error(message);

    // 簡易的なトースト風通知（実際のアプリに合わせて調整）
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 16px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        font-size: 14px;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;

    // CSS animationを追加
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // 3秒後に自動で削除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
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