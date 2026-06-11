import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { MovieApp } from '@/movie/MovieApp';
import { Route, Routes, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();
  return (
    <>
      <main>
        <Routes location={location}>
          <Route path="/" element={
            <>
              <Header />
              <div className='l-main' id='wrapper'>
                <article className='l-innerContainer'>
                  <div className='u-mb-2em'>
                    <h2 className='u-txt-white p-main__h2'>選ぶ、並べる、<br className='u-disp-sp' />見えてくる "好き"
                    </h2>
                  </div>
                  <div className='m-main__desc'>
                    <p>テーマごとに好きな作品を10作品だけ選んで並べるサイトです。</p>
                    <p>「ベストアルバム10枚」「泣ける映画10選」など‥‥ 自分だけのリストを気軽につくれます。</p>
                    <p>ユーザー登録は必要ありません。</p>
                    <p>作品の画像も表示されるので、見た目にもわかりやすく。</p>
                    <p>話のきっかけや、誰かとの共有にも使えます。</p>
                    <p>ただ並べてみるだけでも、あなたの「好き」が見えてくるかもしれません。</p>
                  </div>
                </article>
              </div>
              <div className='l-innerContainer'>
                <button>
                  <img src={albumLogoIcon} width='280' height='60' alt='音楽用のアイコン' loading='lazy' />
                </button>
                <button>
                  <img src={movieLogoIcon} width='280' height='60' alt='映画用のアイコン' loading='lazy' />
                </button>
              </div>
            </>
          } />
          <Route path='/album' element={<AlbumApp key={location.pathname} />} />
          <Route path='/movie' element={<MovieApp key={location.pathname} />} />
        </Routes>
      </main >
    </>
  )
}