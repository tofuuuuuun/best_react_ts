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
              <div className='l-container mainContainer'>
                <div className='inner-container_top m-bottom-2em'>
                  <div className='m-bottom-2em'><h2 className='txt-white mainText'>選ぶ、並べる、<br className='disp-Sp' />見えてくる  "好き"</h2></div>

                  <div className=''>
                    <p className='textM1 txt-white m-bottom-1em lh-2'>このサイトは、テーマごとに好きな作品を10作品だけ選んで並べるWebサービスです。</p>
                    <p className='textM1 txt-white m-bottom-1em lh-2'>「ベストアルバム10枚」「泣ける映画10選」など‥‥ 自分だけのリストを気軽につくれます。</p>
                    <p className='textM1 txt-white m-bottom-1em lh-2'>ユーザー登録は必要ありません。</p>
                    <p className='textM1 txt-white m-bottom-1em lh-2'>作品のカバー画像も自動で表示されるので、見た目にもわかりやすく。</p>
                    <p className='textM1 txt-white m-bottom-1em lh-2'>話のきっかけや、誰かとの共有にも使えます。</p>
                    <p className='textM1 txt-white lh-2'>ただ並べてみるだけでも、あなたの「これが好き」が少しはっきり見えてくるかもしれません。</p>
                  </div>
                </div>
              </div>
              <ul className='linkWrapper'>
                <li className='l-linkCard'><Link to='/album' className='linkCard ta-center'><img src={albumLogoIcon} width='280' height='60' alt='音楽用のアイコン' /></Link></li>
                <li className='l-linkCard'><Link to='/movie' className='linkCard ta-center'><img src={movieLogoIcon} width='280' height='60' alt='映画用のアイコン' /></Link></li>
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