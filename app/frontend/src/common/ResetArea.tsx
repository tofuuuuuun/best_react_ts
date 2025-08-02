import { handleCapture } from '@/common/util';
import cameraIcon from '@/images/camera.png';
import rotateIcon from '@/images/rotate.png';
import { ResetAreaProps } from '@/types/types';

export const ResetArea = (props: ResetAreaProps) => {
    const { reset, type } = props;
    const resetButtonStyle = type === '/album' ? 'u-bg-green' : 'u-bg-purple';
    return (
        <div className='m-utility__container'>
            <button className={`m-btn__utility u-textM1 ${resetButtonStyle}`} onClick={reset}>
                <img src={rotateIcon} alt='リセットボタンのアイコン' />リセット
            </button>
            <button className={`m-btn__utility u-textM1 ${resetButtonStyle}`} onClick={handleCapture}>
                <img src={cameraIcon} alt='キャプチャボタンのアイコン' /> 共有
            </button>
        </div>
    )
}