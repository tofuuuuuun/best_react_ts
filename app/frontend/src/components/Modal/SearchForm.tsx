import searchIcon from '../../../public/images/search.png';
import { Autocomplete } from './Autocomplete';

type ResponseArtist = {
    id: string;
    name: string;
    images: { url: string }[];
}

type SearchFormProps = {
    artistName: string;
    inputArtistName: (event: { target: { value: string } }) => void;
    clearModal: () => void;
    searchArtist: (artistName: string) => void;
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
}

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