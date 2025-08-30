import Carousel from './components/Layout/Carousel'
import { COMING_SOON_DATA } from './config/config-env'
import RegisterFormDialog from './components/RegisterFormDialog';

const App = () => {
  return (
    <div>
      <div className="pt-5 p-3">
        <img src="/logo.png" className='object-contain w-[300px]' alt="Logo" />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <Carousel />
        <h1 className='text-white  text-[1rem] md:text-[1.2rem] lg:text-[1.6rem]  text-center mt-5'>Comming Soon {COMING_SOON_DATA}</h1>
        <RegisterFormDialog />
      </div>
    </div>
  )
}

export default App