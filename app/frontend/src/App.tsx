import { Modal } from '@/album/components/Modal/Modal';
import { Header } from '@/common/Header';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { ResponseArtistType } from '@/types/types';
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const App = () => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseArtist, setResponseArtist] = useState<ResponseArtistType[]>([]);

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
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('アーティスト情報の取得に失敗しました。');
    }
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
          // searchArtist={searchArtist}
          // inputArtistName={inputArtistName}
          // changeType={changeType}
          // dataType={dataType}
          // searchAlbum={searchAlbum}
          // filterResponseAlbum={filterResponseAlbum}
          // clearModal={clearModal}
          // artistName={artistName}
          // deleteAlbum={deleteAlbum}
          // toggleItems={toggleAlbum}
          // albumArtList={albumArtList}
          />
        )}
      </div>
    </main >
  )
}