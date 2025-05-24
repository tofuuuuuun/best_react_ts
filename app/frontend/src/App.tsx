import { AlbumApp } from '@/album/components/AlbumApp';
import { Header } from '@/common/Header';
import '@/css/home.css';
import albumLogoIcon from '@/images/album/logo.svg';
import mainImage from '@/images/home/main.png';
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
                <h2>好きなものを語りたいときに、ちょっと便利なリスト。</h2>
                <p className='textM1'>このサイトは、テーマごとに好きな作品を10個だけ選んで並べるWebサービスです。</p>
                <p className='textM1 m-bottom-1em'>「ベストアルバム10枚」「泣ける映画10選」など‥‥ 自分だけのリストを気軽につくれます。</p>
                <p className='textM1 m-bottom-1em'>ユーザー登録は必要ありません。</p>
                <p className='textM1 m-bottom-1em'>作品のカバー画像も自動で表示されるので、見た目にもわかりやすく。</p>
                <p className='textM1 m-bottom-1em'>話のきっかけや、誰かとの共有にも使えます。</p>
                <p className='textM1 m-bottom-1em'>ただ並べてみるだけでも、あなたの「これが好き」が少しはっきり見えてくるかもしれません。</p>
                <img src={mainImage} alt='mainImage' className='mainImage' />
              </div>
              <ul className='linkWrapper'>
                <li className='l-linkCard'><Link to='/album' className='linkCard ta-center'><img src={albumLogoIcon}></img></Link></li>
                <li className='l-linkCard'><Link to='/movie' className='linkCard ta-center'><img src={movieLogoIcon}></img></Link></li>
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