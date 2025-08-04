import NO_IMAGE from '@/images/movie/no_image.webp';
import { MoviePosterListProps } from '@/types/types';
import { BsXCircleFill } from 'react-icons/bs';

const API_BASE_URL = 'https://image.tmdb.org/t/p/w200/';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROXY_URL = `${BASE_URL}/proxy/getProxyImage.php?url=`;

export const MoviePosterList = (props: MoviePosterListProps) => {
    const { moviePosterList, deleteMovie } = props;

    const getProxyImageUrl = (originalUrl: string) => {
        const imageItem = `${API_BASE_URL}${originalUrl}`;
        return originalUrl ? `${PROXY_URL}${encodeURIComponent(imageItem)}` : NO_IMAGE;
    }

    return (
        <>
            {moviePosterList.length != 0 && (
                <div className='m-bestList__container'>
                    <div className='u-ta-center u-m-bottom-2em u-p-top-1em'>
                        <input type='text' placeholder='このリストに名前をつけよう' className='m-bestList__input'></input>
                    </div>
                    <ul className='m-bestList__list' id='target'>
                        {moviePosterList.map((movie, index) => (
                            <li className='m-bestList__items action' id={movie.id} key={index} >
                                <img className='m-bestList__img' src={getProxyImageUrl(movie.poster_path)} />
                                <span className='m-bestList__title'>{movie.title}</span>
                                <span className='m-bestList__icon--remove' onClick={() => deleteMovie(movie.id)}><BsXCircleFill /></span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}