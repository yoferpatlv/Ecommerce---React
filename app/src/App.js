import { useState } from 'react'
import Feedback from './components/Feedback'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Profile from './components/Profile'
import RegisterPage from './pages/RegisterPage'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Context from './utils/Context'

function App() {
    const navigate = useNavigate()

    const [feedback, setFeedback] = useState({ message: null, level: null })

    const handleNavigationToRegister = () => {
        navigate('register')
    }

    const handleNavigationToLogin = () => {
        navigate('login')
    }

    const handleNavigationToHome = () => {
        navigate('/')
    }

    const handleLogoutClick = () => {
        delete sessionStorage.token
        
        
        handleNavigationToHome()
    }

    const handleAcceptFeedback = () => {
        const feedback = { message: null, level: null }

        setFeedback(feedback)

    }

    const handleFeedback = feedback => {
        setFeedback(feedback)

    }


    return <Context.Provider value={{ handleFeedback }}>

        <div className="App container container--full container--width">
            <Routes>
                <Route path='login' element={sessionStorage.token ? <Navigate to="/" /> : <LoginPage onCloseClick={handleNavigationToHome} onLinkClick={handleNavigationToRegister} onLogIn={handleNavigationToHome} />}/>
                {/* sessionStorage.token? profile : login */}

                <Route path='register' element={sessionStorage.token ? <Navigate to="/" /> : <RegisterPage onCloseClick={handleNavigationToHome} onLinkClick={handleNavigationToLogin} onSingUp={handleNavigationToLogin} />} />

                <Route path='/*' element={<HomePage onLoginClick={handleNavigationToLogin} onLogoutClick={handleLogoutClick}/> }/>

            </Routes>
            {feedback.message && <Feedback level={feedback.level} message={feedback.message} onClick={handleAcceptFeedback} />}
        </div>
    </Context.Provider>
}

export default App
