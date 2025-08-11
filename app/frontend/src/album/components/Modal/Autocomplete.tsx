import noImage from '@/images/album/noImage.webp';
import { ModalAutocompleteProps } from '@/types/types';

export const Autocomplete = (props: ModalAutocompleteProps) => {
    const { responseArtist, searchAlbum } = props;
    return (
        <>
            {responseArtist.length !== 0 && (
                <div className='m-autocomplete'>
                    <ul className='m-autocomplete__list'>
                        {responseArtist.map((artist, index) => (
                            <li className='m-autocomplete__items u-p-left-05em' data-artist_id={artist.id} key={artist.id} onClick={() => searchAlbum(artist.id, artist.name)}>
                                <img className='m-autocomplete__items--img' src={artist.images[0]?.url || noImage} loading={index >= 2 ? "lazy" : "eager"} />
                                <div className='m-autocomplete__items__info'>
                                    <span className='u-txt-white u-font-wb'>{artist.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}