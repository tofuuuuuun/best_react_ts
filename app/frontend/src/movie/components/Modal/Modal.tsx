import { GenericModal } from '@/common/GenericModal';

export const Modal = () => {
    // const { toggleModal, searchMovie, movieTitle, inputMovieTitle, responseMovies, clearModal, moviePosterList, toggleItems, errorMessage } = props;
    // const onClose = () => toggleModal(false);
    // const MAX_ALBUM = 10;
    return (
        <GenericModal onClose={() => { }}>
            <></>
            {/* <SearchForm
                artistName=''
                inputArtistName={() => { }}
                searchArtist={() => { }}
                responseArtist={[]}
                searchAlbum={() => { }}
                movieTitle={movieTitle}
                inputMovieTitle={inputMovieTitle}
                clearModal={clearModal}
                searchMovie={searchMovie}
                type='movie'
            />
            <div className='u-txt-white'><p>あと{MAX_ALBUM - moviePosterList.length}作品選べます</p></div>
            <ErrorMessage errorMessage={errorMessage} />
            {responseMovies.length !== 0 && (
                <div className='m-top-1em'>
                    <ResponseMovies
                        toggleItems={toggleItems}
                        responseMovies={responseMovies}
                        moviePosterList={moviePosterList}
                    />
                </div>
            )} */}
        </GenericModal>
    )
}