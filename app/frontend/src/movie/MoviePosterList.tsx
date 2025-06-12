import NO_IMAGE from '@/images/movie/no_image.png';
import { MoviePosterListProps } from '@/types/types';

const BASE_URL = 'https://image.tmdb.org/t/p/w500/';

export const MoviePosterList = (props: MoviePosterListProps) => {
    const { moviePosterList, deleteMovie } = props;
    const setMoviePosterImage = (poster: string) => poster ? `${BASE_URL}${poster}` : NO_IMAGE;
    return (
        <>
            {moviePosterList.length != 0 && (
                <div className='innerContent'>
                    <div className='l-common'>
                        <div className='ta-center m-bottom-2em p-top-1em'><input type='text' placeholder='このリストに名前をつけよう' className='listNameInput'></input></div>
                        <ul className='moviePosterList' id='target'>
                            {moviePosterList.map((movie, index) => (
                                <li className='movieListItem action' id={movie.id} key={index} >
                                    <img className='l-moviePoster m-bottom-05em' src={setMoviePosterImage(movie.poster_path)} />
                                    <span className='selectName'>{movie.title}</span>
                                    <span className='posterRemove' onClick={() => deleteMovie(movie.id)}><span className='icon-close'></span></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}