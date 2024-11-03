import searchIcon from '../../../public/images/search.png';

type SearchFormProps = {
    artistName: string;
    inputArtistName: (event: { target: { value: string } }) => void;
    clearModal: () => void;
    searchArtist: (artistName: string) => void;
}

export const SearchForm = (props: SearchFormProps) => {
    const { artistName, inputArtistName, clearModal, searchArtist } = props;
    return (
        <div className='l-searchForm ta-left' >
            <div className='l-selectType'>
                <input type='text' name='artist' id='artistName' placeholder='アーティスト名を入力してください' data-artist_id='' value={artistName} onChange={inputArtistName} />
                <div className='clear' onClick={() => clearModal()}><span className='icon-close'></span></div>
            </div>
            <div className='l-autocomplete'></div>
            <div className='p-left-1em'>
                <button className='l-buttonSearch txt-white bg-turquoise search action' onClick={() => searchArtist(artistName)}>
                    <img src={searchIcon} alt='searchIcon' width='15' />
                </button>
            </div>
        </div >
    )
}