import { useEffect, useState, useCallback } from 'react'
import { Modal } from './components/Modal/Modal.tsx';
import { Header } from './common/Header.tsx';
import { Introduction } from './components/Introduction.tsx';
import { AddButton } from './components/AddButton.tsx';
import { MoviePosterList } from './components/MoviePosterList.tsx';
import { ResetArea } from './components/ResetArea.tsx';
import { TOKEN } from './Constants.tsx';
import html2canvas from 'html2canvas';
import { ResponseMoviesType, ResponseTopRatedMoviesType } from '../types/types.ts';

const INTRODUCTION_SELECTOR = '#introduction';
const L_ALBUMLIST_SELECTOR = '.l-albumList';

export const App = () => {
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

  const toggleAlbum = (id: string, title: string, poster: string) => {
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
    // APIリクエスト
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: TOKEN
      }
    };
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&include_adult=false&language=ja-JA&region=JA&page=1`, options);
      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }
      const data = await response.json();
      setResponseMovies((prevState) => [...prevState, ...data["results"]]);
    } catch {
      setErrorMessage('映画の検索中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const getTopRatedMovies = useCallback(async () => {
    const totalPages = [1, 2, 3, 4, 5];
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: TOKEN
      }
    };
    try {
      Promise.all(
        totalPages.map(page =>
          fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ja-JA&page=${page}&region=JA`, options)
            .then(res => res.json())
        )
      )
        .then(responses => {
          const allResults = responses.flatMap(res => res.results);

          const getRandomMovies = (count: number) => {
            const randomMovies = [];
            for (let i = 0; i < count; i++) {
              const randomIndex = Math.floor(Math.random() * allResults.length);
              randomMovies.push(allResults[randomIndex]);
            }
            return randomMovies;
          };
          setRandomURLList1(getRandomMovies(10));
          setRandomURLList2(getRandomMovies(10));
          setRandomURLList3(getRandomMovies(10));
          setRandomURLList4(getRandomMovies(10));
        })
        .catch(err => setErrorMessage(err.message));
    } catch {
      console.log('error');
      alert('エラーが発生しました。リロードし直してください。')
    }
  }, []);


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
  }, [moviePosterList, getTopRatedMovies]);

  return (
    <>
      <Header />
      <main>
        <div className='contentWrapper'>
          <div className='l-contentWrapper'>
            {!isSelectStart && (
              <Introduction
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
            toggleAlbum={toggleAlbum}
            errorMessage={errorMessage}
          />
        )}
      </main >
    </>
  )
}