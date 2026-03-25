import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Importing the legal pages
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

// For Uploading images and other media
import Upload from './pages/Upload/Upload'

// For the main settings page and components 
import Settings from './pages/Settings/Settings'

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

        {/* For the main settings components  */}
        <Route path='/settings' element={<Settings/>}/>

        {/* For the main upload pages */}
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
    </Router>
  )
}
export default App