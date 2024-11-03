import { SearchForm } from './SearchForm'
import { SelectType } from './SelectType';
import { ErrorMessage } from '../../error/ErrorMessage';
import { ResponseAlbumList } from './ResponseAlbumList';

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
                        responseArtist={responseArtist}
                        searchAlbum={searchAlbum}
                    />
                    <ErrorMessage errorMessage={errorMessage} />
                    {filterResponseAlbum.length !== 0 && (
                        <div>
                            <SelectType
                                type={type}
                                selectType={selectType}
                            />
                            <ResponseAlbumList
                                toggleAlbum={toggleAlbum}
                                filterResponseAlbum={filterResponseAlbum}
                                albumArtList={albumArtList}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}