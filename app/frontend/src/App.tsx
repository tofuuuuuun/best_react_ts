import { Header } from '@/common/Header';
import { Home } from '@/Home';

const TYPE = 'home';

export const App = () => {

  return (
    <>
      <Header type={TYPE} />
      <main>
        <Home />
      </main >
    </>
  )
}