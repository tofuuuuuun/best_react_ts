import { GenericCheckButton } from '@/common/GenericCheckButton';
import { ResponseAlbumListProps } from '@/types/types';
import React, { useMemo } from 'react';

export const ResponseAlbumList = React.memo(((props: ResponseAlbumListProps) => {
    const { toggleItems, filterResponseAlbum, albumArtList } = props;

    const albumIdSet = useMemo(
        () => new Set(albumArtList.map(item => item.id)),
        [albumArtList]);

    return (
        <ul className='c-response'>
            {filterResponseAlbum.map((album, index) => (
                <li className='c-response__item' id={index === 0 ? 'firstItems' : ''} key={album.id} >
                    <img className='c-response__img' src={album.images.length !== 0 ? album.images[1].url : ''} loading='lazy' />
                    <div className='c-response__info'>
                        <p className='c-response__primary'>{album.name}   ({album.release_date.substring(0, 4)})</p>
                        <p className='c-response__secondary'>{album.artists.map((value) => value.name).join(',')}</p>
                    </div>
                    <GenericCheckButton
                        id={album.id}
                        title={album.name}
                        image={album.images[0]?.url}
                        artists={album.artists.map((value) => value.name).join(',')}
                        toggleDisplayFlg={albumIdSet.has(album.id)}
                        toggleItems={toggleItems}
                    />
                </li>
            ))}
        </ul>
    );
}))