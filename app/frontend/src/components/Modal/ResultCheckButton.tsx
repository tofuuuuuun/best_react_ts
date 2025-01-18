import { CheckboxButtonProps } from '../../types/types.ts';

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
            <label htmlFor={`checkbox-${id}`} className={toggleDisplayFlg ? 'l-button bg-orange txt-white action ta-center' : 'l-button bg-turquoise txt-white action ta-center'}>
                {toggleDisplayFlg ? '選択中' : '選択'}
            </label>
        </>
    )
}