import { GenericBestList } from '@/common/GenericBestList';
import { AlbumArtListProps } from '@/types/types';
import { BsXCircleFill } from "react-icons/bs";

export const AlbumArtList = (props: AlbumArtListProps) => {
    const { albumArtList, deleteAlbum } = props;
    return (
        <>
            {albumArtList.length != 0 && (
                <GenericBestList>
                    {albumArtList.map((album, index) => (
                        <li className='m-bestList__items action' id={album.id} key={index} >
                            <img className='m-bestList__img m-bestList__img--music' src={album.albumArt} />
                            <span className='m-bestList__title'>{album.albumName}</span>
                            <span className='m-bestList__sub'>{album.albumArtist}</span>
                            <span className='m-bestList__icon--remove' onClick={() => deleteAlbum(album.id)}><BsXCircleFill /></span>
                        </li>
                    ))}
                </GenericBestList>
            )}
        </>
    )
}