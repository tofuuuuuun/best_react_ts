import noImage from '../../public/images/noImage.png';
import searchIcon from '../../public/images/search.png';

type ResponseArtist = {
    id: string;
    name: string;
    images: { url: string }[];
}

type ResponseAlbumType = {
    album_type: string;
    id: string;
    images: { url: string }[];
    name: string;
    release_date: string;
    type: string;
    artists: { id: string, name: string }[];
}

type ModalProps = {
    toggleModal: (toggle: boolean) => void;
    changeType: (typeValue: string) => void
    type: string;
    searchArtist: (artistName: string) => void;
    artistName: string;
    inputArtistName: (event: { target: { value: string } }) => void;
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
    filterResponseAlbum: ResponseAlbumType[];
    clearModal: () => void;
    deleteAlbum: (id: string) => void;
    albumArtList: { id: string, albumName: string, albumArt: string, albumArtist: string }[];
    handleChange: (id: string, albumName: string, albumArt: string, albumArtist: string) => void;
    errorMessage: string;
}

export const Modal = (props: ModalProps) => {
    const { toggleModal, changeType, type, searchArtist, artistName, inputArtistName, responseArtist, searchAlbum, filterResponseAlbum, clearModal, albumArtList, handleChange, errorMessage } = props;

    const selectType = (event: { target: { value: string; }; }) => changeType(event.target.value);
    const changeFlg = () => toggleModal(false);
    return (
        <div className='modal-container'>
            <div className='modal-body'>
                <div className='modal-close' onClick={changeFlg}><span className='icon-close'></span></div>
                <div className='modal-content'>
                    <div className='l-searchForm ta-left'>
                        <div className='l-selectType'>
                            <input type='text' name='artist' id='artistName' placeholder='アーティスト名' data-artist_id='' value={artistName} onChange={inputArtistName} />
                            <div className='clear' onClick={() => clearModal()}><span className='icon-close'></span></div>
                        </div>
                        <div className='l-autocomplete'></div>
                        <div className='p-left-1em'>
                            <button className='l-buttonSearch txt-white bg-turquoise search action' onClick={() => searchArtist(artistName)}>
                                <img src={searchIcon} alt='searchIcon' width='15' />
                            </button>
                        </div>
                    </div>
                    {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
                    {responseArtist.length !== 0 && (
                        <div className='l-autocomplete'>
                            <ul className='autocompleteList padding-all-1em'>
                                {responseArtist.map((artist, index) => (
                                    <li className='artistItems action' data-artist_id={artist.id} key={index} onClick={() => searchAlbum(artist.id, artist.name)}>
                                        <img className='l-searchArtistImage artistImage' src={artist.images[0]?.url || noImage} loading='lazy' />
                                        <div className='l-artistInfo'>
                                            <span className='searchArtistName font-wb'>{artist.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {filterResponseAlbum.length !== 0 && (
                        <div>
                            <div className='ta-left m-bottom-05em p-top-1em'>
                                <form id='type'>
                                    <input type='radio' name='typeLabel' id='typeAll' value='all' checked={type === 'all'} onChange={selectType} />
                                    <label htmlFor='typeAll' className='l-subButton bg-gray typeAll m-right-05em'>すべて</label>
                                    <input type='radio' name='typeLabel' id='typeAlbum' value='album' checked={type === 'album'} onChange={selectType} />
                                    <label htmlFor='typeAlbum' className='l-subButton bg-gray typeAlbum m-right-05em'>アルバム</label>
                                    <input type='radio' name='typeLabel' id='typeSingleEP' value='single' checked={type === 'single'} onChange={selectType} />
                                    <label htmlFor='typeSingleEP' className='l-subButton bg-gray typeSingleEP'>シングルとEP</label>
                                </form>
                            </div>
                            <ul className='modalList'>
                                {filterResponseAlbum.map((album, index) => (
                                    <li className='albumItems' id={index === 0 ? 'firstItems' : ''} key={index} >
                                        <img className='albumImage' src={album.images.length !== 0 ? album.images[0].url : ''} loading='lazy' />
                                        <div className='l-albumInfo'>
                                            <span className='albumName font-wb'>{album.name} ({album.release_date.substring(0, 4)})</span>
                                            <span className='artistsName'>{album.artists.map((value) => value.name).join(',')}</span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            id={`checkbox-${album.id}`}
                                            className={albumArtList.some((item) => item.id === album.id) ? 'selected' : 'select'}
                                            checked={albumArtList.some((item) => item.id === album.id)}
                                            onChange={() => handleChange(album.id, album.name, album.images[0]?.url, album.artists.map((value) => value.name).join(','))}
                                        />
                                        <label htmlFor={`checkbox-${album.id}`} className={albumArtList.some((item) => item.id === album.id) ? 'l-button bg-orange txt-white action ta-center' : 'l-button bg-turquoise txt-white action ta-center'}>
                                            {albumArtList.some((item) => item.id === album.id) ? '選択中' : '選択'}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}