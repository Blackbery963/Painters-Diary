import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//The main home page
import Home from './Home/Home'



import FAQs from './pages/Legal/FAQs'
import Help from './pages/Legal/Help'
import TermsAndConditions from './pages/Legal/TermsAndConditions'
import CookiePolicy from './pages/Legal/Cookies'
import SecurityPolicy from './pages/Legal/ScurityPolicy'
import LandingPage from './pages/Home/LandingPage'
import About from './pages/Legal/About'

//Authentication Pages
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import EmailVerification from './pages/Auth/EmailVerification'
import ResetPassword from './pages/Auth/ResetPassword'
import ForgotPassword from './pages/Auth/ForgotPassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route
        path='/'
        element={
          <LandingPage/>
          // <Home/>
        }
        />

        
        <Route path='/About' element={<About/>}/>
        <Route path='/Legal/FAQs' element={<FAQs/>}/>
        <Route path='/Legal/Help' element={<Help/>}/>
        <Route path='/Legal/TermsAndConditions' element={<TermsAndConditions/>}/>
        <Route path='/Legal/PrivacyPolicy' element={<SecurityPolicy/>}/>
        <Route path='/Legal/Cookies' element={<CookiePolicy/>}/>

        {/* Authentication Routes */}
        <Route path='/auth/signup' element={<Signup/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/email-verification' element={<EmailVerification/>}/>
        <Route path='/auth/reset-password' element={<ResetPassword/>}/>
        <Route path='/auth/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  )
}
export default App