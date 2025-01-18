import { movieIntroductionProps } from '../../types/types';

const BASE_URL = 'https://image.tmdb.org/t/p/w500/';

export const Introduction = (props: movieIntroductionProps) => {
    const { selectStart, randomURLList1, randomURLList2, randomURLList3, randomURLList4 } = props;

    const renderMovieList = (movies: { poster_path: string }[], className: string) => {
        return (
            <ul className={className}>
                {movies.map((movie, index) => (
                    movie.poster_path ? <li key={index}><img className='l-topRateMovies' src={`${BASE_URL}${movie.poster_path}`} /></li> : ''
                ))
                }
            </ul>
        )
    };

    return (
        <>
            <div id='introduction' className='l-introductionWrapper l-overflowHidden startText ta-center fadeIn'>
                <div className='l-gridPosterWrapper'>
                    <div className='girdPosterBlockWrapper m-right-1em'>
                        {renderMovieList(randomURLList1, 'l-gridPoster scroll-infinity__list--left1 infinity-scroll-left1')}
                        {renderMovieList(randomURLList1, 'l-gridPoster scroll-infinity__list--left1 infinity-scroll-left1')}
                    </div>
                    <div className='girdPosterBlockWrapper m-right-1em'>
                        {renderMovieList(randomURLList2, 'l-gridPoster scroll-infinity__list--right1 infinity-scroll-right1')}
                        {renderMovieList(randomURLList2, 'l-gridPoster scroll-infinity__list--right1 infinity-scroll-right1')}
                    </div>
                    <div className='girdPosterBlockWrapper m-right-1em'>
                        {renderMovieList(randomURLList3, 'l-gridPoster scroll-infinity__list--left2 infinity-scroll-left2')}
                        {renderMovieList(randomURLList3, 'l-gridPoster scroll-infinity__list--left2 infinity-scroll-left2')}
                    </div>
                    <div className='girdPosterBlockWrapper'>
                        {renderMovieList(randomURLList4, 'l-gridPoster scroll-infinity__list--right2 infinity-scroll-right2')}
                        {renderMovieList(randomURLList4, 'l-gridPoster scroll-infinity__list--right2 infinity-scroll-right2')}
                    </div>
                </div>
                <div className='l-introductionText txt-white font-wb ta-left'>
                    <p className='topText m-bottom-1em'>あなたの心に残る<br />映画、<br />10作品だけ選べますか？</p>
                    <div className='l-startButtonWrapper ta-center'>
                        <button className='startButton bg-purple txt-white font-wb' onClick={() => selectStart()}>映画を選ぶ
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}