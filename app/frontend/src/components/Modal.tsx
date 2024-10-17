
import noImage from '../../public/images/noImage.png';
import searchIcon from '../../public/images/search.png';

type ResponseArtist = {
    id: string;
    name: string;
    images: { url: string }[];
}

type FilterResponseAlbum = {
    id: string;
    name: string;
    release_date: string;
    artists: { name: string }[];
    images: { url: string }[];
}

type IsCheckedArrayProps = {
    id: string;
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
    filterResponseAlbum: FilterResponseAlbum[]
    addAlbumArt: (id: string, name: string, image: string, artist: string) => void;
    isCheckedArray: IsCheckedArrayProps[];
    addIsChecked: (id: string) => void;
    clearModal: () => void;
    errorMessage: string;
}

export const Modal = (props: ModalProps) => {
    const { toggleModal, changeType, type, searchArtist, artistName, inputArtistName, responseArtist, searchAlbum, filterResponseAlbum, addAlbumArt, isCheckedArray, addIsChecked, clearModal, errorMessage } = props;

    const selectType = (event: { target: { value: string; }; }) => changeType(event.target.value);
    const changeFlg = () => toggleModal(false);
    const addAlbumList = (id: string, name: string, image: string, artist: string) => { addAlbumArt(id, name, image, artist); }
    const isChecked = (id: string) => addIsChecked(id);
    const isCheckedToggle = (id: string) => isCheckedArray.some((value) => value.id === id)
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
                                        <label htmlFor={album.id} className={isCheckedToggle(album.id) ? 'l-button bg-orange txt-white action ta-center' : 'l-button bg-turquoise txt-white action ta-center'}>
                                            <input type='checkbox'
                                                id={album.id}
                                                className={isCheckedToggle(album.id) ? 'selected' : 'select'}
                                                checked={isCheckedToggle(album.id)}
                                                onChange={() => {
                                                    addAlbumList(album.id, album.name, album.images.length !== 0 ? album.images[0].url : '', album.artists.map((value) => value.name).join(', '));
                                                    isChecked(album.id);
                                                }} />{isCheckedToggle(album.id) ? '選択中' : '選択'}
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