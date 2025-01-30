import cameraIcon from '@/images/album/camera.png';
import rotateIcon from '@/images/album/rotate.png';
import { ResetAreaProps } from '@/types/types';

export const ResetArea = (props: ResetAreaProps) => {
    const { reset, handleCapture } = props;
    return (
        <div className='resetArea m-top-1em'>
            <div className='resetWrapper ta-center'>
                <button className='l-button action m-right-1em txt-white bg-turquoise reset action' onClick={reset}>
                    <img src={rotateIcon} alt='リセットボタンのアイコン' />
                </button>
                <button className='l-button txt-white bg-turquoise capture action' onClick={handleCapture}>
                    <img src={cameraIcon} alt='キャプチャボタンのアイコン' />
                </button>
            </div>
        </div>
    )
}