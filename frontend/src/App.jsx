import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Navbar from './pages/Auth/Navbar';
import ScrollToTop from './components/ScrollToTop';



function App() {

  return (
    <>
      <ScrollToTop/>
      <ToastContainer/>
      <Navbar/>
      <main className='py-3'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
