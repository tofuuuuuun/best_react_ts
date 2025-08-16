import { AlbumArtList } from '@/album/components/AlbumArtList';
import { Modal } from '@/album/components/Modal/Modal';
import { AddButton } from '@/common/AddButton';
import { useDebounce } from '@/common/debounce';
import { Header } from '@/common/Header';
import { Introduction } from '@/common/Introduction';
import { ResetArea } from '@/common/ResetArea';
import { AlbumArtListType, ResponseAlbumType, ResponseArtistType, frontCoverArt } from '@/types/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AlbumApp = () => {
  const [isSelectStart, setIsSelectStart] = useState<boolean>(false);
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [addButtonVisible, setAddButtonVisible] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [dataType, setDataType] = useState('all');
  const [responseArtist, setResponseArtist] = useState<ResponseArtistType[]>([]);
  const [responseAlbum, setResponseAlbum] = useState<ResponseAlbumType[]>([]);
  const [filterResponseAlbum, setFilterResponseAlbum] = useState<ResponseAlbumType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [albumArtList, setAlbumArtList] = useState<AlbumArtListType[]>([]);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [randomURLList1, setRandomURLList1] = useState<frontCoverArt[]>([]);
  const [randomURLList2, setRandomURLList2] = useState<frontCoverArt[]>([]);
  const [randomURLList3, setRandomURLList3] = useState<frontCoverArt[]>([]);
  const [randomURLList4, setRandomURLList4] = useState<frontCoverArt[]>([]);

  const TYPE = useLocation().pathname;

  const selectStart = () => {
    setIsSelectStart(!isSelectStart);
    setAddButtonVisible(true);
  }

  const toggleModal = (toggleFlg: boolean) => {
    clearModal();
    setModalIsOpen(toggleFlg);
  }

  const debounce = useDebounce(500);

  const debounceSearch = (name: string) => {
    setResponseArtist([]);
    debounce(() => {
      searchArtist(name);
    })
  };

  const inputArtistName = (event: { target: { value: string } }) => {
    const inputValue = event.target.value;
    setArtistName(inputValue);
    if (!inputValue || inputValue.trim() === '') {
      setResponseArtist([]);
      setErrorMessage('');
      return;
    }
    setResponseArtist([]);
    debounceSearch(inputValue);
  };

  const changeType = (typeValue: string) => {
    setDataType(typeValue);
    if (typeValue != 'all') {
      const filtered = responseAlbum.filter(album => album.album_type === typeValue);
      setFilterResponseAlbum(filtered);
    } else {
      setFilterResponseAlbum(responseAlbum);
    }
    scrollTop();
  };

  const scrollTop = () => {
    const modalWindow = document.getElementById('firstItems');
    modalWindow?.scrollIntoView(true);
  }

  const toggleAlbum = (id: string, albumName: string, albumArt: string, albumArtist?: string) => {
    setAlbumArtList((prevList) => {
      const isSelected = prevList.some((item) => item.id === id);
      if (isSelected) {
        return prevList.filter((item) => item.id !== id);
      } else {
        return [...prevList, { id, albumName, albumArt, albumArtist: albumArtist ?? '' }];
      }
    });
  }

  const deleteAlbum = (id: string) => {
    const deleteArray = albumArtList.filter(album => album.id !== id);
    setAlbumArtList(deleteArray);
    setResetButtonVisible(false);
    if (albumArtList.length <= 10) {
      setResetButtonVisible(false);
      setAddButtonVisible(true);
      setFilterResponseAlbum([]);
    }
  }

  const clearModal = () => {
    setArtistName('');
    setResponseArtist([]);
    setFilterResponseAlbum([]);

    setRandomURLList1([]);
    setRandomURLList2([]);
    setRandomURLList3([]);
    setRandomURLList4([]);
  }

  const resetAlbumList = () => {
    clearModal();
    setAlbumArtList([]);
    setAddButtonVisible(true);
    setResetButtonVisible(false);
  }

  const searchArtist = async (artistName: string) => {
    setResponseArtist([]);
    setErrorMessage('');
    const params = new URLSearchParams({ 'artistName': encodeURIComponent(artistName) });
    try {
      const response = await fetch(`${BASE_URL}/album/searchArtists.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseData = await response.json();
        setResponseArtist(responseData);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アーティスト情報の取得に失敗しました。');
    }
  };

  const searchAlbum = async (artistId: string, name: string) => {
    setErrorMessage('');
    setResponseArtist([]);
    setResponseAlbum([]);
    setFilterResponseAlbum([]);
    setDataType('all');

    const params = new URLSearchParams({
      'artistName': name,
      'type': 'all',
      'artistId': artistId
    });
    try {
      const response = await fetch(`${BASE_URL}/album/searchArtistAlbum.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseAlbumData = await response.json();
        setResponseAlbum((prevAlbum) => [...prevAlbum, ...responseAlbumData]);
        setFilterResponseAlbum((prevAlbum) => [...prevAlbum, ...responseAlbumData]);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`アルバム情報の取得に失敗しました。${error}`);
    }
  }

  const fetchTopRatedCover = async () => {
    try {
      const response = await fetch(`${BASE_URL}/album/getTopRate.php`);

      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }
      const data = await response.json();

      const getRandomCover = () => {
        const maxCount = 10;
        const randomCover: frontCoverArt[] = [];

        for (let i = 0; i < maxCount; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          // 重複があった場合にはやり直す
          if (randomCover.some(cover => cover === data[randomIndex])) {
            i--;
            continue;
          }
          randomCover.push(data[randomIndex]);
        }

        return randomCover;
      };

      setRandomURLList1(getRandomCover());
      setRandomURLList2(getRandomCover());
      setRandomURLList3(getRandomCover());
      setRandomURLList4(getRandomCover());
    } catch (error) {
      console.log(error);
      alert('エラーが発生しました。リロードし直してください。')
    }
  };

  useEffect(() => {
    if (albumArtList.length === 10) {
      setResetButtonVisible(true);
      setAddButtonVisible(false);
      setModalIsOpen(false);
    }
    fetchTopRatedCover();
  }, [albumArtList.length]);


  return (
    <>
      <Header />
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
      {isSelectStart && (
        <div className='l-container'>
          {addButtonVisible && (
            <AddButton
              isModalOpen={isModalOpen}
              setModalIsOpen={setModalIsOpen}
              type={TYPE}
            />)}
          {resetButtonVisible && (
            <ResetArea
              reset={resetAlbumList}
              type={TYPE}
            />
          )}
          {isSelectStart && (
            <AlbumArtList
              isSelectStart={isSelectStart}
              albumArtList={albumArtList}
              deleteAlbum={deleteAlbum}
            />
          )}
          {isModalOpen && (
            <Modal
              toggleModal={toggleModal}
              searchArtist={searchArtist}
              inputArtistName={inputArtistName}
              changeType={changeType}
              dataType={dataType}
              responseArtist={responseArtist}
              searchAlbum={searchAlbum}
              filterResponseAlbum={filterResponseAlbum}
              errorMessage={errorMessage}
              clearModal={clearModal}
              artistName={artistName}
              deleteAlbum={deleteAlbum}
              toggleItems={toggleAlbum}
              albumArtList={albumArtList}
            />
          )}
        </div >
      )}
    </>
  )
}