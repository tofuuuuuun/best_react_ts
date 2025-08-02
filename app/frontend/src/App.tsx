import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import '@/css/home.css';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';
import { MovieApp } from '@/movie/MovieApp';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

const TYPE = 'home';

export const App = () => {
  const location = useLocation();
  return (
    <>
      <main>
        <Routes location={location}>
          <Route path="/" element={
            <>
              <Header type={TYPE} />
              <div className='l-container' id='wrapper'>
                <article className='m-innerContainer'>
                  <div className='u-m-bottom-2em'>
                    <h2 className='u-txt-white m-main__text'>選ぶ、並べる、<br className='u-display-Sp' />見えてくる "好き"
                    </h2></div>
                  <div className='m-main__text--sub'>
                    <p className='u-textM1 u-m-bottom-1em'>テーマごとに好きな作品を10作品だけ選んで並べるサイトです。</p>
                    <p className='u-textM1 u-m-bottom-1em'>「ベストアルバム10枚」「泣ける映画10選」など‥‥ 自分だけのリストを気軽につくれます。</p>
                    <p className='u-textM1 u-m-bottom-1em'>ユーザー登録は必要ありません。</p>
                    <p className='u-textM1 u-m-bottom-1em'>作品の画像も表示されるので、見た目にもわかりやすく。</p>
                    <p className='u-textM1 u-m-bottom-1em'>話のきっかけや、誰かとの共有にも使えます。</p>
                    <p className='u-textM1'>ただ並べてみるだけでも、あなたの「好き」が見えてくるかもしれません。</p>
                  </div>
                </article>
              </div>
              <ul className='m-linkCard--list'>
                <li className='m-linkCard'>
                  <Link to='/album' className='u-ta-center'>
                    <img src={albumLogoIcon} width='280' height='60' alt='音楽用のアイコン' loading='lazy' />
                  </Link>
                </li>
                <li className='m-linkCard'>
                  <Link to='/movie' className='u-ta-center'>
                    <img src={movieLogoIcon} width='280' height='60' alt='映画用のアイコン' loading='lazy' />
                  </Link>
                </li>
              </ul>
            </>
          } />
          <Route path='/album' element={<AlbumApp key={location.pathname} />} />
          <Route path='/movie' element={<MovieApp key={location.pathname} />} />
        </Routes>
      </main >
    </>
  )
}