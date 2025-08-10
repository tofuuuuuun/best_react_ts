import { GenericModal } from '@/common/GenericModal';
import { SearchForm } from '@/common/SearchForm';
import { ErrorMessage } from '@/error/ErrorMessage';
import { ResponseMovies } from '@/movie/components/Modal/ResponseMovies';
import { movieModalProps } from '@/types/types';

export const Modal = (props: movieModalProps) => {
    const { toggleModal, searchMovie, movieTitle, inputMovieTitle, responseMovies, clearModal, moviePosterList, toggleMovie, errorMessage } = props;
    const onClose = () => toggleModal(false);
    const MAX_ALBUM = 10;
    return (
        <GenericModal onClose={onClose}>
            <SearchForm
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
                        toggleMovie={toggleMovie}
                        responseMovies={responseMovies}
                        moviePosterList={moviePosterList}
                    />
                </div>
            )}
        </GenericModal>
    )
}