import { ResultCheckboxButton } from '@/album/components/Modal/ResultCheckButton';
import { ResponseAlbumListProps } from '@/types/types';
import React, { useMemo } from 'react';


export const ResponseAlbumList = React.memo(((props: ResponseAlbumListProps) => {
    const { toggleAlbum, filterResponseAlbum, albumArtList } = props;

    const albumIdSet = useMemo(
        () => new Set(albumArtList.map(item => item.id)),
        [albumArtList]);

    return (
        <ul className='modalList'>
            {filterResponseAlbum.map((album, index) => (
                <li className='albumItems' id={index === 0 ? 'firstItems' : ''} key={album.id} >
                    <img className='albumImage' src={album.images.length !== 0 ? album.images[1].url : ''} loading='lazy' />
                    <div className='l-albumInfo'>
                        <span className='albumName font-wb'>{album.name}   ({album.release_date.substring(0, 4)})</span>
                        <span className='artistsName'>{album.artists.map((value) => value.name).join(',')}</span>
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