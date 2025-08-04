import { handleCapture } from '@/common/util';
import { ResetAreaProps } from '@/types/types';
import { BsArrowCounterclockwise, BsFillCameraFill } from "react-icons/bs";

export const ResetArea = (props: ResetAreaProps) => {
    const { reset, type } = props;
    const resetButtonStyle = type === '/album' ? 'u-bg-green' : 'u-bg-purple';
    return (
        <div className='m-utility__container'>
            <button className={`m-btn__utility u-txt-white u-textM1 ${resetButtonStyle}`} onClick={reset}>
                <BsArrowCounterclockwise />リセット
            </button>
            <button className={`m-btn__utility u-txt-white u-textM1 ${resetButtonStyle}`} onClick={handleCapture}>
                <BsFillCameraFill /> 共有
            </button>
        </div>
    )
}