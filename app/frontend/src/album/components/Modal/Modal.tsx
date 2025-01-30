import { ResponseAlbumList } from '@/album/components/Modal/ResponseAlbumList';
import { SearchForm } from '@/album/components/Modal/SearchForm';
import { SelectType } from '@/album/components/Modal/SelectType';
import { ErrorMessage } from '@/error/ErrorMessage';
import { ModalProps } from '@/types/types';


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