import { CheckboxButtonProps } from '@/types/types';
import { FaCheck, FaPlus } from 'react-icons/fa';

export const ResultCheckboxButton = (props: CheckboxButtonProps) => {
    const { id, name, image, artists, toggleDisplayFlg, toggleAlbum } = props;

    return (
        <>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className={toggleDisplayFlg ? 'selected' : 'select'}
                checked={toggleDisplayFlg}
                onChange={() => toggleAlbum(id, name, image, artists)}
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