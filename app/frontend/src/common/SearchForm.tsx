import { Autocomplete } from '@/album/components/Modal/Autocomplete';
import searchIcon from '@/images/album/search.png';
import { SearchFormProps } from '@/types/types';

export const SearchForm = (props: SearchFormProps) => {
    const { artistName, inputArtistName, clearModal, searchArtist, responseArtist, searchAlbum, searchMovie, movieTitle, inputMovieTitle, type } = props;
    const formType = type === 'album' ? 'album' : 'movie';
    return (
        <div className='l-searchForm ta-left' >
            <div className='l-selectType'>
                <input
                    type='text'
                    name='form'
                    placeholder={`${formType === 'album' ? 'アーティスト名' : '映画名'}を入力してください`}
                    value={formType === 'album' ? artistName : movieTitle}
                    onChange={formType === 'album' ? inputArtistName : inputMovieTitle}
                />
                <div className='clear' onClick={() => clearModal()}>
                    <span className='icon-close'></span>
                </div>
                {formType === 'album' && (
                    <Autocomplete
                        responseArtist={responseArtist}
                        searchAlbum={searchAlbum}
                    />
                )}
            </div>
            <div className='p-left-1em'>
                <button
                    className={`l-buttonSearch txt-white search action ${formType === 'album' ? 'bg-turquoise' : 'bg-purple'}`}
                    onClick={() => formType === 'album' ? searchArtist(artistName) : searchMovie(movieTitle)}
                >
                    <img src={searchIcon} alt='searchIcon' width='15' />
                </button>
            </div>
        </div >
    )
}