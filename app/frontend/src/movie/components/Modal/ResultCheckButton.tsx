import { movieCheckboxButtonProps } from '@/types/types';
import { FaCheck, FaPlus } from 'react-icons/fa';

export const ResultCheckboxButton = (props: movieCheckboxButtonProps) => {
    const { id, title, poster, toggleDisplayFlg, toggleMovie } = props;
    return (
        <>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className={toggleDisplayFlg ? 'selected' : 'select'}
                checked={toggleDisplayFlg}
                onChange={() => toggleMovie(id, title, poster)}
                aria-checked={toggleDisplayFlg}
            />
            <label
                htmlFor={`checkbox-${id}`}
                className={`m-btn__checkbox ${toggleDisplayFlg ? ' u-txt-white u-bg-orange ' : 'u-txt-navy u-bg-gray'}`} >
                {toggleDisplayFlg ? <FaCheck /> : <FaPlus />}
                {toggleDisplayFlg ? '済み' : '追加'}
            </label >
        </>
    )
}