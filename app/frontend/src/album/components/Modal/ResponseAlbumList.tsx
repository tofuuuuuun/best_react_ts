import { ResultCheckboxButton } from '@/album/components/Modal/ResultCheckButton';
import { ResponseAlbumListProps } from '@/types/types';
import React, { useMemo } from 'react';

export const ResponseAlbumList = React.memo(((props: ResponseAlbumListProps) => {
    const { toggleAlbum, filterResponseAlbum, albumArtList } = props;

    const albumIdSet = useMemo(
        () => new Set(albumArtList.map(item => item.id)),
        [albumArtList]);

    return (
        <ul className='m-modal__list'>
            {filterResponseAlbum.map((album, index) => (
                <li className='m-modalResponse' id={index === 0 ? 'firstItems' : ''} key={album.id} >
                    <img className='m-modalResponse__img--album' src={album.images.length !== 0 ? album.images[1].url : ''} loading='lazy' />
                    <div className='m-modalResponse__info'>
                        <p className='m-modalResponse__info__name u-font-wb'>{album.name}   ({album.release_date.substring(0, 4)})</p>
                        <p className='m-modalResponse__info__name--sub'>{album.artists.map((value) => value.name).join(',')}</p>
                    </div>
                    <ResultCheckboxButton
                        id={album.id}
                        name={album.name}
                        image={album.images[0]?.url}
                        artists={album.artists.map((value) => value.name).join(',')}
                        toggleDisplayFlg={albumIdSet.has(album.id)}
                        toggleAlbum={toggleAlbum}
                    />
                </li>
            ))}
        </ul>
    );
}))