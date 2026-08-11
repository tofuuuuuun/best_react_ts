import { Modal } from '@/album/components/Modal/Modal';
import { Header } from '@/common/Header';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { AlbumArtListType, ResponseAlbumType, ResponseArtistType } from '@/types/types';
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const App = () => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseArtist, setResponseArtist] = useState<ResponseArtistType[]>([]);
  const [responseAlbum, setResponseAlbum] = useState<ResponseAlbumType[]>([]);
  const [filterResponseAlbum, setFilterResponseAlbum] = useState<ResponseAlbumType[]>([]);
  const [albumArtList, setAlbumArtList] = useState<AlbumArtListType[]>([]);
  const [dataType, setDataType] = useState('all');

  const [inputValue, setInputValue] = useState<string>('');

  const toggleModal = (toggleFlg: boolean, type?: string) => {
    clearModal();
    setSelectedMode(type || '');
    setModalIsOpen(toggleFlg);
  }

  const clearModal = () => {
    setInputValue('');
  }

  const onSearch = async (inputValue: string) => {
    setResponseArtist([]);
    setErrorMessage('');
    const params = new URLSearchParams({ 'artistName': encodeURIComponent(inputValue) });
    try {
      const response = await fetch(`${BASE_URL}/album/searchArtists.php?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseData = await response.json();
        setResponseArtist(responseData);
        console.log('responseData:', responseData);
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アーティスト情報の取得に失敗しました。');
    }
  }

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
  const changeType = (typeValue: string) => {
    setDataType(typeValue);
    if (typeValue != 'all') {
      const filtered = responseAlbum.filter(album => album.album_type === typeValue);
      setFilterResponseAlbum(filtered);
    } else {
      setFilterResponseAlbum(responseAlbum);
    }
    window.scrollTo(0, 0);
  };


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

  return (
    <main>
      <Header />
      <div className='l-main' id='wrapper'>
        <div className='l-innerContainer'>
          <div className='u-mb-2em'>
            <h2 className='u-txt-white p-main__h2'>選ぶ、並べる、<br className='u-disp-sp' />見えてくる "好き"
            </h2>
          </div>
          <div>
            <p className='p-main__lead'>好きな作品を10個選ぶだけ。</p>
            <p className='p-main__desc'>あなたを形作った作品たちを、ひとつのリストとして残せます。</p>
          </div>
        </div>

        <ul className="c-select__list">
          <li>
            <button className="c-select__card u-bg-black" onClick={() => toggleModal(!isModalOpen, 'album')}>
              <img src={albumLogoIcon} alt="音楽を選ぶ" />
            </button>
          </li>
          <li>
            <button className="c-select__card u-bg-black" onClick={() => toggleModal(!isModalOpen, 'movie')}>
              <img src={movieLogoIcon} alt="映画を選ぶ" />
            </button>
          </li>
        </ul>
        {isModalOpen && (
          <Modal
            toggleModal={toggleModal}
            inputValue={inputValue}
            selectedMode={selectedMode}
            responseArtist={responseArtist}
            onSearch={onSearch}
            clearModal={clearModal}
            errorMessage={errorMessage}
            searchAlbum={searchAlbum}
            filterResponseAlbum={filterResponseAlbum}
            dataType={dataType}
            albumArtList={albumArtList}
            toggleItems={toggleAlbum}
            changeType={changeType}

          // searchArtist={searchArtist}
          // inputArtistName={inputArtistName}
          // searchAlbum={searchAlbum}
          // clearModal={clearModal}
          // artistName={artistName}
          // deleteAlbum={deleteAlbum}
          />
        )}
      </div>
    </main >
  )
}