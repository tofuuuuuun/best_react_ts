import { AlbumArtListProps } from '@/types/types';

export const AlbumArtList = (props: AlbumArtListProps) => {
    const { albumArtList, deleteAlbum } = props;
    return (
        <>
            {albumArtList.length != 0 && (
                <div className='l-common'>
                    <div className='ta-center m-bottom-2em p-top-1em'><input type='text' placeholder='BEST ALBUM' className='listNameInput'></input></div>
                    <ul className='albumArtList' id='target'>
                        {albumArtList.map((album, index) => (
                            <li className='albumListItem action' id={album.id} key={index} >
                                <img className='l-albumArt m-bottom-05em' src={album.albumArt} />
                                <span className='selectName'>{album.albumName}</span>
                                <span className='selectAlbumArtist'>{album.albumArtist}</span>
                                <span className='albumRemove' onClick={() => deleteAlbum(album.id)}><span className='icon-close'></span></span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}