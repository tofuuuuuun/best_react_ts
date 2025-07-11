import NO_IMAGE from '@/images/movie/no_image.webp';
import { ResultCheckboxButton } from '@/movie/components/Modal/ResultCheckButton';
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
        <ul className='modalList'>
            {responseMovies.map((movie, index) => (
                <li className={`movieItems ${index === 0 ? 'first-item' : ''}`} key={movie.id} >
                    <img className='moviePoster' src={setMoviePosterImage(movie.poster_path)} loading={index >= 2 ? "lazy" : "eager"} />
                    <div className='l-movieInfo'>
                        <span className='movieTitle p-all-1em font-wb'>{movie.title}</span>
                    </div>
                    <ResultCheckboxButton
                        id={movie.id}
                        title={movie.title}
                        poster={movie.poster_path}
                        toggleDisplayFlg={movieIdSet.has(movie.id)}
                        toggleMovie={toggleMovie}
                    />
                </li>
            ))
            }
        </ul >
    );
})