import { ErrorMessage } from '@/error/ErrorMessage';
import { SearchForm } from '@/movie/components/Form/SearchForm';
import { ResponseMovies } from '@/movie/components/Modal/ResponseMovies';
import { movieModalProps } from '@/types/types';

export const Modal = (props: movieModalProps) => {
    const { toggleModal, searchMovie, movieTitle, inputMovieTitle, responseMovies, clearModal, moviePosterList, toggleAlbum, errorMessage } = props;
    const closeModal = () => toggleModal(false);
    const MAX_ALBUM = 10;
    return (
        <div className='modal-container'>
            <div className='modal-body'>
                <div className='modal-close' onClick={closeModal}><span className='icon-close'></span></div>
                <div className='modal-content'>
                    <SearchForm
                        movieTitle={movieTitle}
                        inputMovieTitle={inputMovieTitle}
                        clearModal={clearModal}
                        searchMovie={searchMovie}
                    />
                    <div className='txt-white'><p>あと{MAX_ALBUM - moviePosterList.length}枚選ぼう</p></div>
                    <ErrorMessage errorMessage={errorMessage} />
                    {responseMovies.length !== 0 && (
                        <div className='m-top-1em'>
                            <ResponseMovies
                                toggleAlbum={toggleAlbum}
                                responseMovies={responseMovies}
                                moviePosterList={moviePosterList}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}