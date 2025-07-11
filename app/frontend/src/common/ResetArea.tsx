import { handleCapture } from '@/common/util';
import cameraIcon from '@/images/camera.png';
import rotateIcon from '@/images/rotate.png';
import { ResetAreaProps } from '@/types/types';

export const ResetArea = (props: ResetAreaProps) => {
    const { reset, type } = props;
    const resetButtonStyle = type === '/album' ? 'bg-turquoise' : 'bg-purple';
    return (
        <div className='resetArea m-top-1em m-bottom-3em'>
            <div className='resetWrapper ta-center'>
                <button className={`l-resetButton action m-right-2em textM1 txt-white reset ${resetButtonStyle}`} onClick={reset}>
                    <img src={rotateIcon} alt='リセットボタンのアイコン' />リセット
                </button>
                <button className={`l-resetButton action txt-white  textM1 ${resetButtonStyle}`} onClick={handleCapture}>
                    <img src={cameraIcon} alt='キャプチャボタンのアイコン' /> 共有
                </button>
            </div>
        </div >
    )
}