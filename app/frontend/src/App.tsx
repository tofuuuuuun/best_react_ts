import { Header } from '@/common/Header';
import albumLogoIcon from '@/images/album/logo.svg';
import movieLogoIcon from '@/images/movie/logo.svg';

export const App = () => {
  return (
    <>
      <main>
        <>
          <Header />
          <div className='l-main' id='wrapper'>
            <article className='l-innerContainer'>
              <div className='u-mb-2em'>
                <h2 className='u-txt-white p-main__h2'>選ぶ、並べる、<br className='u-disp-sp' />見えてくる "好き"
                </h2>
              </div>
              <div>
                <p className='p-main__lead'>好きな作品を10個選ぶだけ。</p>
                <p className='p-main__desc'>あなたを形作った作品たちを、ひとつのリストとして残せます。</p>
              </div>
            </article>
          </div>
          <ul className="c-select__list">
            <li>
              <button className="c-select__card u-bg-black">
                <img src={albumLogoIcon} alt="音楽を選ぶ" />
              </button>
            </li>

            <li>
              <button className="c-select__card u-bg-black">
                <img src={movieLogoIcon} alt="映画を選ぶ" />
              </button>
            </li>
          </ul>
        </>
      </main >
    </>
  )
}