import { ResponseAlbumList } from '@/album/components/Modal/ResponseAlbumList';
import { SelectType } from '@/album/components/Modal/SelectType';
import { SearchForm } from '@/common/SearchForm';
import { ErrorMessage } from '@/error/ErrorMessage';
import { ModalProps } from '@/types/types';

export const Modal = (props: ModalProps) => {
    const { toggleModal, changeType, dataType, searchArtist, artistName, inputArtistName, responseArtist, searchAlbum, filterResponseAlbum, clearModal, albumArtList, toggleAlbum, errorMessage } = props;

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
                        movieTitle={""}
                        inputMovieTitle={() => { }}
                        searchMovie={() => { }}
                        clearModal={clearModal}
                        searchArtist={searchArtist}
                        responseArtist={responseArtist}
                        searchAlbum={searchAlbum}
                        type='album'
                    />
                    <ErrorMessage errorMessage={errorMessage} />
                    {filterResponseAlbum.length !== 0 && (
                        <div>
                            <SelectType
                                dataType={dataType}
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