import noImage from '@/images/album/noImage.png';
import { ModalAutocompleteProps } from '@/types/types';

export const Autocomplete = (props: ModalAutocompleteProps) => {
    const { responseArtist, searchAlbum } = props;
    return (
        <>
            {responseArtist.length !== 0 && (
                <div className='l-autocomplete'>
                    <ul className='autocompleteList'>
                        {responseArtist.map((artist, index) => (
                            <li className='artistItems action p-left-05em m-bottom-5px' data-artist_id={artist.id} key={index} onClick={() => searchAlbum(artist.id, artist.name)}>
                                <img className='l-searchArtistImage artistImage' src={artist.images[0]?.url || noImage} loading={index >= 2 ? "lazy" : "eager"} />
                                <div className='l-artistInfo'>
                                    <span className='searchArtistName  txt-white font-wb'>{artist.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}