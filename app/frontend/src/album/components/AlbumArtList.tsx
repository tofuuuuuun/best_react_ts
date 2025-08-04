import { AlbumArtListProps } from '@/types/types';
import { BsXCircleFill } from "react-icons/bs";

export const AlbumArtList = (props: AlbumArtListProps) => {
    const { albumArtList, deleteAlbum } = props;
    return (
        <>
            {albumArtList.length != 0 && (
                <div className='m-bestList__container'>
                    <div className='u-ta-center u-m-bottom-2em u-p-top-1em'>
                        <input type='text' placeholder='このリストに名前をつけよう' className='m-bestList__input'></input>
                    </div>
                    <ul className='m-bestList__list' id='target'>
                        {albumArtList.map((album, index) => (
                            <li className='m-bestList__items action' id={album.id} key={index} >
                                <img className='m-bestList__img' src={album.albumArt} />
                                <span className='m-bestList__title'>{album.albumName}</span>
                                <span className='m-bestList__sub'>{album.albumArtist}</span>
                                <span className='m-bestList__icon--remove' onClick={() => deleteAlbum(album.id)}><BsXCircleFill /></span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}