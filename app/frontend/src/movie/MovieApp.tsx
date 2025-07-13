import { AddButton } from '@/common/AddButton';
import { Header } from '@/common/Header';
import { Introduction } from '@/common/Introduction';
import { ResetArea } from '@/common/ResetArea';
import '@/css/movie/movieStyle.css';
import { Modal } from '@/movie/components/Modal/Modal';
import { MoviePosterList } from '@/movie/MoviePosterList';
import { ResponseMoviesType, frontCoverArt } from '@/types/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const INTRODUCTION_SELECTOR = '#introduction';

export const MovieApp = () => {
  const [isSelectStart, setIsSelectStart] = useState<boolean>(false);
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [addButtonVisible, setAddButtonVisible] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [responseMovies, setResponseMovies] = useState<ResponseMoviesType[]>([]);
  const [moviePosterList, setMoviePosterList] = useState<ResponseMoviesType[]>([]);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [randomURLList1, setRandomURLList1] = useState<frontCoverArt[]>([]);
  const [randomURLList2, setRandomURLList2] = useState<frontCoverArt[]>([]);
  const [randomURLList3, setRandomURLList3] = useState<frontCoverArt[]>([]);
  const [randomURLList4, setRandomURLList4] = useState<frontCoverArt[]>([]);

  const TYPE = useLocation().pathname;

  const selectStart = () => {
    const element = document.querySelector(INTRODUCTION_SELECTOR) as HTMLElement;
    element.classList.add('fadeOut');
    setIsSelectStart(!isSelectStart);
    setAddButtonVisible(true);
  }

  const toggleModal = (toggleFlg: boolean) => {
    clearModal();
    setModalIsOpen(toggleFlg);
  }
  const clearModal = () => {
    setMovieTitle('');
    setResponseMovies([]);
  }

  const inputMovieTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMovieTitle(value);
  }

  const toggleMovie = (id: string, title: string, poster: string) => {
    setMoviePosterList((prevList) => {
      const isSelected = prevList.some((item) => item.id === id);
      if (isSelected) {
        return prevList.filter((item) => item.id !== id);
      } else {
        return [...prevList, { id: id, title: title, poster_path: poster }];
      }
    });
  }

  const deleteMovie = (id: string) => {
    const deleteArray = moviePosterList.filter(movie => movie.id !== id);
    setMoviePosterList(deleteArray);
    setResetButtonVisible(false);
    if (moviePosterList.length <= 10) {
      setResetButtonVisible(false);
      setAddButtonVisible(true);
    }
  }

  const resetMoviePosterList = () => {
    clearModal();
    setMoviePosterList([]);
    setAddButtonVisible(true);
    setResetButtonVisible(false);
  }

  const searchMovie = async (movieTitle: string) => {
    setResponseMovies([]);
    setErrorMessage('');
    console.log('searchMovie movieTitle', encodeURIComponent(movieTitle));
    try {
      const response = await fetch(`${BASE_URL}/movie/searchMovie.php?movieTitle=${movieTitle}`);
      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }
      const data = await response.json();

      console.log('searchMovie data', data);
      setResponseMovies((prevState) => [...prevState, ...data["results"]]);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('映画の検索中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/getTopRate.php`);
      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }
      const data = await response.json();
      const getRandomMovies = () => {
        const maxCount = 10;
        const randomMovies = [];
        for (let i = 0; i < maxCount; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          randomMovies.push(data[randomIndex]);
        }
        return randomMovies;
      };
      setRandomURLList1(getRandomMovies());
      setRandomURLList2(getRandomMovies());
      setRandomURLList3(getRandomMovies());
      setRandomURLList4(getRandomMovies());
    } catch {
      console.log('error');
      alert('エラーが発生しました。リロードし直してください。')
    }
  };

  useEffect(() => {
    if (moviePosterList.length === 10) {
      setResetButtonVisible(true);
      setAddButtonVisible(false);
      setModalIsOpen(false);
    }
    getTopRatedMovies()
  }, [moviePosterList]);

  return (
    <>
      <Header type={TYPE} />
      <div className='mainWrapper'>
        <div className='p-top-2em'>
          <div className='l-contentWrapper m-bottom-1em'>
            {!isSelectStart && (
              <Introduction
                selectStart={selectStart}
                randomURLList1={randomURLList1}
                randomURLList2={randomURLList2}
                randomURLList3={randomURLList3}
                randomURLList4={randomURLList4}
                type={TYPE}
              />
            )}
            {addButtonVisible && (
              <AddButton
                isModalOpen={isModalOpen}
                setModalIsOpen={setModalIsOpen}
                type={TYPE}
              />)}
          </div>
          {resetButtonVisible && (
            <ResetArea
              reset={resetMoviePosterList}
              type={TYPE}
            />
          )}
          {isSelectStart && (
            <MoviePosterList
              moviePosterList={moviePosterList}
              deleteMovie={deleteMovie}
            />
          )}
        </div>
        {isModalOpen && (
          <Modal
            toggleModal={toggleModal}
            searchMovie={searchMovie}
            inputMovieTitle={inputMovieTitle}
            responseMovies={responseMovies}
            moviePosterList={moviePosterList}
            movieTitle={movieTitle}
            clearModal={clearModal}
            deleteMovie={deleteMovie}
            toggleMovie={toggleMovie}
            errorMessage={errorMessage}
          />
        )}
      </div >
    </>
  )
}