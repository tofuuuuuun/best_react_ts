import { GenericCheckButton } from '@/common/GenericCheckButton';
import NO_IMAGE from '@/images/movie/no_image.webp';
import { ResponseMoviesProps } from '@/types/types';
import React, { useMemo } from 'react';

const BASE_URL = 'https://image.tmdb.org/t/p/w200/';

export const ResponseMovies = React.memo((props: ResponseMoviesProps) => {
    const { toggleMovie, responseMovies, moviePosterList } = props;
    const setMoviePosterImage = (poster: string) => poster ? `${BASE_URL}${poster}` : NO_IMAGE;

    const movieIdSet = useMemo(
        () => new Set(moviePosterList.map(item => item.id)),
        [moviePosterList]);

    return (
        <ul className='m-modal__list'>
            {responseMovies.map((movie, index) => (
                <li className={`m-modalResponse ${index === 0 ? 'first-item' : ''}`} key={movie.id} >
                    <img className='m-modalResponse__img' src={setMoviePosterImage(movie.poster_path)} loading={index >= 2 ? "lazy" : "eager"} />
                    <div className='m-modalResponse__info'>
                        <p className='m-modalResponse__info__name u-font-wb'>{movie.title}</p>
                    </div>
                    <GenericCheckButton
                        id={movie.id}
                        title={movie.title}
                        image={movie.poster_path}
                        artists=''
                        toggleDisplayFlg={movieIdSet.has(movie.id)}
                        toggleItems={toggleMovie}
                    />
                </li>
            ))
            }
        </ul >
    );
})