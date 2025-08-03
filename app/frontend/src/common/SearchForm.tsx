import { Autocomplete } from '@/album/components/Modal/Autocomplete';
import { SearchFormProps } from '@/types/types';
import { BsSearch, BsXCircleFill } from "react-icons/bs";

export const SearchForm = (props: SearchFormProps) => {
    const { artistName, inputArtistName, clearModal, searchArtist, responseArtist, searchAlbum, searchMovie, movieTitle, inputMovieTitle, type } = props;
    const formType = type === 'album' ? 'album' : 'movie';
    return (
        <div className='m-form__container'>
            <div className='m-form__search'>
                <input
                    type='text'
                    name='form'
                    placeholder={`${formType === 'album' ? 'アーティスト名' : '映画名'}を入力してください`}
                    value={formType === 'album' ? artistName : movieTitle}
                    onChange={formType === 'album' ? inputArtistName : inputMovieTitle}
                />
                <div className='m-form__btn--clear' onClick={() => clearModal()}>
                    <BsXCircleFill />
                </div>
                {formType === 'album' && (
                    <Autocomplete
                        responseArtist={responseArtist}
                        searchAlbum={searchAlbum}
                    />
                )}
            </div>
            <div className='u-p-left-1em'>
                <button
                    className={`m-btn m-btn--search u-txt-white ${formType === 'album' ? 'u-bg-green' : 'u-bg-purple'}`}
                    onClick={() => formType === 'album' ? searchArtist(artistName) : searchMovie(movieTitle)}
                >
                    <BsSearch />
                </button>
            </div>
        </div >
    )
}