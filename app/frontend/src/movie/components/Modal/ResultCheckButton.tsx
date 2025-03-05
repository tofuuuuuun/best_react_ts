import { movieCheckboxButtonProps } from '@/types/types';

export const ResultCheckboxButton = (props: movieCheckboxButtonProps) => {
    const { id, title, poster, toggleDisplayFlg, toggleAlbum } = props;
    const handleAlbum = () => {
        toggleAlbum(id, title, poster);
    }
    return (
        <>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className={toggleDisplayFlg ? 'selected' : 'select'}
                checked={toggleDisplayFlg}
                onChange={handleAlbum}
                aria-checked={toggleDisplayFlg}
            />
            <label htmlFor={`checkbox-${id}`} className={toggleDisplayFlg ? 'l-button bg-purple txt-white action ta-center' : 'l-button bg-gray txt-navy action ta-center'}>
                {toggleDisplayFlg ? '選択中' : '選択'}
            </label>
        </>
    )
}