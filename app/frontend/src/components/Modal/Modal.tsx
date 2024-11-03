import { ModalAutocomplete } from './Autocomplete';
import { SearchForm } from './SearchForm';
import { ResultCheckboxButton } from './ResultCheckButton';
import { ErrorMessage } from '../../error/ErrorMessage';

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
    toggleAlbum: (id: string, albumName: string, albumArt: string, albumArtist: string) => void;
    errorMessage: string;
}

export const Modal = (props: ModalProps) => {
    const { toggleModal, changeType, type, searchArtist, artistName, inputArtistName, responseArtist, searchAlbum, filterResponseAlbum, clearModal, albumArtList, toggleAlbum, errorMessage } = props;

    const selectType = (event: { target: { value: string; }; }) => changeType(event.target.value);
    const changeFlg = () => toggleModal(false);
    return (
        <div className='modal-container'>
            <div className='modal-body'>
                <div className='modal-close' onClick={changeFlg}><span className='icon-close'></span></div>
                <div className='modal-content'>
                    <SearchForm
                        artistName={artistName}
                        inputArtistName={inputArtistName}
                        clearModal={clearModal}
                        searchArtist={searchArtist}
                    />
                    <ErrorMessage errorMessage={errorMessage} />
                    <ModalAutocomplete
                        responseArtist={responseArtist}
                        searchAlbum={searchAlbum}
                    />
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
                                        <ResultCheckboxButton
                                            id={album.id}
                                            name={album.name}
                                            image={album.images[0]?.url}
                                            artists={album.artists.map((value) => value.name).join(',')}
                                            toggleDisplayFlg={albumArtList.some((item) => item.id === album.id)}
                                            toggleAlbum={toggleAlbum}
                                        />
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