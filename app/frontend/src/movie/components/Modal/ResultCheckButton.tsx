import { movieCheckboxButtonProps } from '@/types/types';

export const ResultCheckboxButton = (props: movieCheckboxButtonProps) => {
    const { id, title, poster, toggleDisplayFlg, toggleMovie } = props;
    const handleMovie = () => {
        toggleMovie(id, title, poster);
    }
    return (
        <>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className={toggleDisplayFlg ? 'selected' : 'select'}
                checked={toggleDisplayFlg}
                onChange={handleMovie}
                aria-checked={toggleDisplayFlg}
            />
            <label htmlFor={`checkbox-${id}`} className={`l-button txt-white action ta-center ${toggleDisplayFlg ? 'bg-orange ' : 'txt-navy bg-gray'}`} >
                {toggleDisplayFlg ? '選択中' : '選択'}
            </label >
        </>
    )
}