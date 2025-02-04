import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage.Jsx'
import DetailPage from './pages/BookDetailPage/BookDetailPage.Jsx'
import SignIn from './pages/AuthPage/SignIn'
import SignUp from './pages/AuthPage/SignUp'
import CartPage from './pages/CartPage/CartPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/book' element={<DetailPage />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  )
}

export default App
