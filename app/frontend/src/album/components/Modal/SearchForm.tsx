import { Autocomplete } from '@/album/components/Modal/Autocomplete';
import searchIcon from '@/images/album/search.png';
import { SearchFormProps } from '@/types/types';


export const SearchForm = (props: SearchFormProps) => {
    const { artistName, inputArtistName, clearModal, searchArtist, responseArtist, searchAlbum } = props;
    return (
        <div className='l-searchForm ta-left' >
            <div className='l-selectType'>
                <input type='text' name='artist' id='artistName' placeholder='アーティスト名を入力してください' data-artist_id='' value={artistName} onChange={inputArtistName} />
                <div className='clear' onClick={() => clearModal()}><span className='icon-close'></span></div>
                <Autocomplete
                    responseArtist={responseArtist}
                    searchAlbum={searchAlbum}
                />
            </div>
            <div className='p-left-1em'>
                <button className='l-buttonSearch txt-white bg-turquoise search action' onClick={() => searchArtist(artistName)}>
                    <img src={searchIcon} alt='searchIcon' width='15' />
                </button>
            </div>
        </div >
    )
}