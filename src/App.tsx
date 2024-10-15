import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import CardPage from './pages/Card'
import ScrollToTop from './components/shared/ScrollToTop'
import SignupPage from './pages/Signup'
import SigninPage from './pages/Signin'
import Navbar from './components/shared/Navbar'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
