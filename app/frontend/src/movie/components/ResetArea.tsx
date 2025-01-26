import cameraIcon from '/public/images/movie/camera.png';
import rotateIcon from '/public/images/movie/rotate.png';
import { ResetAreaProps } from '/types/types';

export const ResetArea = (props: ResetAreaProps) => {
    const { reset, handleCapture } = props;
    return (
        <div className='resetArea m-top-1em'>
            <div className='resetWrapper ta-center'>
                <button className='l-button action m-right-1em txt-white bg-purple reset action' onClick={reset}>
                    <img src={rotateIcon} alt='リセットボタンのアイコン' />
                </button>
                <button className='l-button txt-white bg-purple capture action' onClick={handleCapture}>
                    <img src={cameraIcon} alt='キャプチャボタンのアイコン' />
                </button>
            </div>
        </div>
    )
}