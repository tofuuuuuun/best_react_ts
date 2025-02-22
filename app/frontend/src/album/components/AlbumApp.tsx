import { AlbumArtList } from '@/album/components/AlbumArtList';
import { AlbumIntroduction } from '@/album/components/AlbumIntroduction';
import { Modal } from '@/album/components/Modal/Modal';
import { AddButton } from '@/common/AddButton';
import { useDebounce } from '@/common/debounce';
import { Header } from '@/common/Header';
import { ResetArea } from '@/common/ResetArea';
import '@/css/album/albumStyle.css';
import { AlbumArtListType, ResponseAlbumType, ResponseArtistType } from '@/types/types';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

const TYPE = 'album';

export const AlbumApp = () => {
  const [isSelectStart, setIsSelectStart] = useState<boolean>(false);
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
  const [addButtonVisible, setAddButtonVisible] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [type, setType] = useState('all');
  const [responseArtist, setResponseArtist] = useState<ResponseArtistType[]>([]);
  const [responseAlbum, setResponseAlbum] = useState<ResponseAlbumType[]>([]);
  const [filterResponseAlbum, setFilterResponseAlbum] = useState<ResponseAlbumType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [albumArtList, setAlbumArtList] = useState<AlbumArtListType[]>([]);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);

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
    setType(typeValue);
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
    setType('all');
    const params = new URLSearchParams({
      'artistName': name,
      'type': 'all',
      'artistId': artistId
    });
    // TODO: サーバー側の実装もallメインで使用することを考慮した実装に修正する
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

  // html2canvasを使用してキャプチャーを取得し、共有する
  const handleCapture = () => {
    const element = document.querySelector('.l-albumList') as HTMLElement
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
              handleCapture={handleCapture}
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
            type={type}
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