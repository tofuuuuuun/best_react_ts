import { ResultCheckboxButton } from './ResultCheckButton';

type ResponseAlbumType = {
    album_type: string;
    id: string;
    images: { url: string }[];
    name: string;
    release_date: string;
    type: string;
    artists: { id: string, name: string }[];
}

type ResponseAlbumListProps = {
    toggleAlbum: (id: string, albumName: string, albumArt: string, albumArtist: string) => void;
    filterResponseAlbum: ResponseAlbumType[];
    albumArtList: { id: string, albumName: string, albumArt: string, albumArtist: string }[];
}

export const ResponseAlbumList = (props: ResponseAlbumListProps) => {
    const { toggleAlbum, filterResponseAlbum, albumArtList } = props;
    return (
        <ul className='modalList'>
            {filterResponseAlbum.map((album, index) => (
                <li className='albumItems' id={index === 0 ? 'firstItems' : ''} key={index} >
                    <img className='albumImage' src={album.images.length !== 0 ? album.images[0].url : ''} loading='lazy' />
                    <div className='l-albumInfo'>
                        <span className='albumName font-wb'>{album.name} ({album.release_date.substring(0, 4)})</span>
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