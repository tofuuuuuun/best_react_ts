import cameraIcon from '@/images/camera.png';
import rotateIcon from '@/images/rotate.png';
import { ResetAreaProps } from '@/types/types';

export const ResetArea = (props: ResetAreaProps) => {
    const { reset, handleCapture, type } = props;
    const resetButtonStyle = type === 'album' ? 'bg-turquoise' : 'bg-purple';
    return (
        <div className='resetArea m-top-1em'>
            <div className='resetWrapper ta-center'>
                <button className={`l-resetButton action m-right-1em txt-white reset ${resetButtonStyle}`} onClick={reset}>
                    <img src={rotateIcon} alt='リセットボタンのアイコン' /> リセット
                </button>
                <button className={`l-resetButton action txt-white ${resetButtonStyle}`} onClick={handleCapture}>
                    <img src={cameraIcon} alt='キャプチャボタンのアイコン' /> キャプチャ
                </button>
            </div>
        </div >
    )
}