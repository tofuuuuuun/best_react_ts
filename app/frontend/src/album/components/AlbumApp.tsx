import { AlbumArtList } from '@/album/components/AlbumArtList';
import { AlbumIntroduction } from '@/album/components/AlbumIntroduction';
import { Modal } from '@/album/components/Modal/Modal';
import { AddButton } from '@/common/AddButton';
import { useDebounce } from '@/common/debounce';
import { Header } from '@/common/Header';
import { ResetArea } from '@/common/ResetArea';
import '@/css/album/albumStyle.css';
import { AlbumArtListType, ResponseAlbumType, ResponseArtistType } from '@/types/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
    debounce(() => {
      searchArtist(name);
    })
  };

  const inputArtistName = (event: { target: { value: string } }) => {
    setArtistName(event.target.value);
    debounceSearch(event.target.value);
  }

  // モーダルからアルバムタイプを切り替え、フィルタリングする
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

  // アルバムアート一覧の表示切替を行う
  const toggleAlbum = (id: string, albumName: string, albumArt: string, albumArtist: string) => {
    setAlbumArtList((prevList) => {
      const isSelected = prevList.some((item) => item.id === id);
      if (isSelected) {
        // すでに選択済みのアルバムを選択した場合、選択済みのアルバムを削除する
        return prevList.filter((item) => item.id !== id);
      } else {
        return [...prevList, { id, albumName, albumArt, albumArtist }];
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
    const params = new URLSearchParams({ 'artistName': artistName });
    try {
      const response = await fetch(`https://rahi-lab.com/searchArtists.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseData = await response.json();
        setResponseArtist([...responseArtist, ...responseData['items']]);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アーティスト情報の取得に失敗しました。');
    }
  };

  // アーティストアルバムを全件取得する。（取得後type切り替えを行なう）
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
      const response = await fetch(`https://rahi-lab.com/searchSpotify.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseAlbumData = await response.json();
        setResponseAlbum((prevAlbum) => [...prevAlbum, ...responseAlbumData['items']]);
        setFilterResponseAlbum((prevAlbum) => [...prevAlbum, ...responseAlbumData['items']]);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`アルバム情報の取得に失敗しました。${error}`);
    }
  }

  useEffect(() => {
    if (albumArtList.length === 10) {
      // 十枚選択したらリセットボタンとキャプチャボタンを表示する
      setResetButtonVisible(true);
      setAddButtonVisible(false);
      setModalIsOpen(false);
    }
  }, [albumArtList.length]);


  return (
    <>
      <Header type={TYPE} />
      <div className='mainWrapper'>
        <div className='contentWrapper'>
          <div className='l-contentWrapper'>
            {!isSelectStart && (
              <AlbumIntroduction selectStart={selectStart} />
            )}
            {addButtonVisible && (
              <AddButton
                isModalOpen={isModalOpen}
                setModalIsOpen={setModalIsOpen}
                type={TYPE}
              />)}
            {isSelectStart && (
              <AlbumArtList
                isSelectStart={isSelectStart}
                albumArtList={albumArtList}
                deleteAlbum={deleteAlbum}
              />
            )}
          </div>
          {resetButtonVisible && (
            <ResetArea
              reset={resetAlbumList}
              type={TYPE}
            />
          )}
        </div>
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
            toggleAlbum={toggleAlbum}
            albumArtList={albumArtList}
          />
        )}
      </div >
    </>
  )
}