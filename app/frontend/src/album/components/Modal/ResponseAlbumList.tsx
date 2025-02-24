import { ResultCheckboxButton } from '@/album/components/Modal/ResultCheckButton';
import { ResponseAlbumListProps } from '@/types/types';


export const ResponseAlbumList = (props: ResponseAlbumListProps) => {
    const { toggleAlbum, filterResponseAlbum, albumArtList } = props;
    return (
        <ul className='modalList'>
            {filterResponseAlbum.map((album, index) => (
                <li className='albumItems' id={index === 0 ? 'firstItems' : ''} key={index} >
                    <img className='albumImage' src={album.images.length !== 0 ? album.images[0].url : ''} loading='lazy' />
                    <div className='l-albumInfo'>
                        <span className='albumName font-wb'>{album.name}   ({album.release_date.substring(0, 4)})</span>
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
    );
}