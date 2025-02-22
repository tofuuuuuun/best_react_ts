import { AddButton } from '@/common/AddButton';
import { Header } from '@/common/Header';
import { ResetArea } from '@/common/ResetArea';
import '@/css/movie/movieStyle.css';
import { Modal } from '@/movie/components/Modal/Modal';
import { MovieIntroduction } from '@/movie/components/MovieIntroduction';
import { MoviePosterList } from '@/movie/components/MoviePosterList';
import { ResponseMoviesType, ResponseTopRatedMoviesType } from '@/types/types';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const INTRODUCTION_SELECTOR = '#introduction';
const L_ALBUMLIST_SELECTOR = '.l-albumList';
const TYPE = 'movie';

export const MovieApp = () => {
  const [isSelectStart, setIsSelectStart] = useState<boolean>(false);
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [addButtonVisible, setAddButtonVisible] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [responseMovies, setResponseMovies] = useState<ResponseMoviesType[]>([]);
  const [moviePosterList, setMoviePosterList] = useState<ResponseMoviesType[]>([]);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [randomURLList1, setRandomURLList1] = useState<ResponseTopRatedMoviesType[]>([]);
  const [randomURLList2, setRandomURLList2] = useState<ResponseTopRatedMoviesType[]>([]);
  const [randomURLList3, setRandomURLList3] = useState<ResponseTopRatedMoviesType[]>([]);
  const [randomURLList4, setRandomURLList4] = useState<ResponseTopRatedMoviesType[]>([]);

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

  const deleteAlbum = (id: string) => {
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
    try {
      const response = await fetch(`${BASE_URL}/movie/searchMovie.php?movieTitle=${movieTitle}`);
      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }

      const data = await response.json();
      setResponseMovies((prevState) => [...prevState, ...data["results"]]);
    } catch {
      setErrorMessage('映画の検索中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/getTopRate.php?`);
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

  // html2canvasを使用してキャプチャーを取得し、共有する
  const handleCapture = () => {
    const element = document.querySelector(L_ALBUMLIST_SELECTOR) as HTMLElement
    html2canvas(element, {
      useCORS: true
    }).then(canvas => {
      const dataURL = canvas.toDataURL("image/png");
      const blob = toBlob(dataURL);
      if (blob) {
        const imageFile = new File([blob], "image.png", {
          type: "image/png",
        });
        navigator.share({
          text: "共有",
          files: [imageFile],
        }).then(() => {
          console.log("success.");
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }

  const toBlob = (base64: string): Blob | null => {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      buffers[i] = decodedData.charCodeAt(i);
    }
    try {
      const blob = new Blob([buffers.buffer], {
        type: "image/png",
      });
      return blob;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

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
        <div className='contentWrapper'>
          <div className='l-contentWrapper'>
            {!isSelectStart && (
              <MovieIntroduction
                selectStart={selectStart}
                randomURLList1={randomURLList1}
                randomURLList2={randomURLList2}
                randomURLList3={randomURLList3}
                randomURLList4={randomURLList4}
              />
            )}
            {addButtonVisible && (
              <AddButton
                isModalOpen={isModalOpen}
                setModalIsOpen={setModalIsOpen}
                type={TYPE}
              />)}
            {isSelectStart && (
              <MoviePosterList
                moviePosterList={moviePosterList}
                deleteAlbum={deleteAlbum}
              />
            )}
          </div>
          {resetButtonVisible && (
            <ResetArea
              reset={resetMoviePosterList}
              handleCapture={handleCapture}
              type={TYPE}
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
            deleteAlbum={deleteAlbum}
            toggleMovie={toggleMovie}
            errorMessage={errorMessage}
          />
        )}
      </div >
    </>
  )
}