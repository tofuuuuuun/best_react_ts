import { ResponseAlbumList } from '@/album/components/Modal/ResponseAlbumList';
import { SelectType } from '@/album/components/Modal/SelectType';
import { GenericModal } from '@/common/GenericModal';
import { SearchForm } from '@/common/SearchForm';
import { ErrorMessage } from '@/error/ErrorMessage';
import { ModalProps } from '@/types/types';

export const Modal = (props: ModalProps) => {
    const { toggleModal, changeType, dataType, searchArtist, artistName, inputArtistName, responseArtist, searchAlbum, filterResponseAlbum, clearModal, albumArtList, toggleAlbum, errorMessage } = props;

    const selectType = (event: { target: { value: string; }; }) => changeType(event.target.value);
    const onClose = () => toggleModal(false);
    const MAX_ALBUM = 10;
    return (
        <GenericModal onClose={onClose}>
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
            <div className='u-txt-white'><p>あと{MAX_ALBUM - albumArtList.length}作品選べます</p></div>
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
        </GenericModal>
    )
}