import { SearchForm } from '@/common/SearchForm';
import { ErrorMessage } from '@/error/ErrorMessage';
import { ResponseMovies } from '@/movie/components/Modal/ResponseMovies';
import { movieModalProps } from '@/types/types';
import { BsXCircleFill } from 'react-icons/bs';

export const Modal = (props: movieModalProps) => {
    const { toggleModal, searchMovie, movieTitle, inputMovieTitle, responseMovies, clearModal, moviePosterList, toggleMovie, errorMessage } = props;
    const closeModal = () => toggleModal(false);
    const MAX_ALBUM = 10;
    return (
        <div className='m-modal__container'>
            <div className='m-modal__body'>
                <div className='m-modal__icon--close' onClick={closeModal}>
                    <BsXCircleFill />
                </div>
                <div className='m-modal__content'>
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
                </div>
            </div>
        </div >
    )
}