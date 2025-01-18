import searchIcon from '../../../public/images/movie/search.png';
import { movieSearchFormProps } from '../../../types/types';


export const SearchForm = (props: movieSearchFormProps) => {
    const { movieTitle, inputMovieTitle, clearModal, searchMovie } = props;
    return (
        <div className='l-searchForm ta-left m-bottom-05em'>
            <div className='l-selectType'>
                <input type='text' name='movie' id='movieTitle' placeholder='映画タイトルを入力してください' value={movieTitle} onChange={inputMovieTitle} />
                <div className='clear' onClick={() => clearModal()}><span className='icon-close'></span></div>
            </div>
            <div className='p-left-1em'>
                <button className='l-buttonSearch txt-white bg-purple search action' name='search' onClick={() => searchMovie(movieTitle)}>
                    <img src={searchIcon} alt='searchIcon' width='15' />
                </button>
            </div>
        </div >
    )
}