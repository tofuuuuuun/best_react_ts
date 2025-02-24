import { CheckboxButtonProps } from '@/types/types';

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
            <label htmlFor={`checkbox-${id}`} className={`l-button action ta-center ${toggleDisplayFlg ? 'txt-white bg-orange ' : 'txt-navy bg-gray'}`}>
                {toggleDisplayFlg ? '選択中' : '選択'}
            </label>
        </>
    )
}