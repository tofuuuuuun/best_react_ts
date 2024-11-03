import noImage from '../../../public/images/noImage.png';

type ResponseArtist = {
    id: string;
    name: string;
    images: { url: string }[];
}

type ModalAutocompleteProps = {
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
}

export const Autocomplete = (props: ModalAutocompleteProps) => {
    const { responseArtist, searchAlbum } = props;
    return (
        <>
            {responseArtist.length !== 0 && (
                <div className='l-autocomplete'>
                    <ul className='autocompleteList'>
                        {responseArtist.map((artist, index) => (
                            <li className='artistItems action p-left-05em m-bottom-5px' data-artist_id={artist.id} key={index} onClick={() => searchAlbum(artist.id, artist.name)}>
                                <img className='l-searchArtistImage artistImage' src={artist.images[0]?.url || noImage} loading='lazy' />
                                <div className='l-artistInfo'>
                                    <span className='searchArtistName font-wb'>{artist.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}