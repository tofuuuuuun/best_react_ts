import { GenericCheckButtonProps } from '@/types/types';
import { FaCheck, FaPlus } from 'react-icons/fa';

export const GenericCheckButton = (props: GenericCheckButtonProps) => {
    const { id, title, image, artists, toggleDisplayFlg, toggleItems } = props;

    return (
        <>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className={toggleDisplayFlg ? 'selected' : 'select'}
                checked={toggleDisplayFlg}
                onChange={() => toggleItems(id, title, image, artists)}
                aria-checked={toggleDisplayFlg}
            />
            <label
                htmlFor={`checkbox-${id}`}
                className={`m-btn__checkbox ${toggleDisplayFlg ? 'u-txt-white u-bg-orange ' : 'u-txt-navy u-bg-gray'}`}>
                {toggleDisplayFlg ? <FaCheck /> : <FaPlus />}
                {toggleDisplayFlg ? '済み' : '追加'}
            </label>
        </>
    )
}