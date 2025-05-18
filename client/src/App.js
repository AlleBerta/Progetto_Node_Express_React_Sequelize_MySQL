import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registrations from './pages/Registrations'
import PageNotFound from './pages/PageNotFound'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  // Creo uno state per:
  // 1. inserire il link di login / registration o logout
  // 2. salvare username, id e status
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false })

  // Viene eseguita appena si apre la pagina, controlla se è presente un accesToken nel local storage
  useEffect(() => {
    // Bypassabile con un fake access token (da console: localStorage.setItem("accessToken", "srgws") e sei dentro)
    // if (localStorage.getItem('accessToken')) {
    //   setAuthState(true)
    // }

    axios.get('/auth/verify', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      // invio file json sempre con success: true/false
      if (!response.data.success) {
        // Modifico solo il campo status 
        setAuthState(prev => ({ ...prev, status: false }))
      }
      else {
        setAuthState({
          username: response.data.user.username,
          id: response.data.user.id,
          status: true
        })
      }
    }).catch((error) => {
      if (error.response) {
        setAuthState(prev => ({ ...prev, status: false }))
      }
      else {
        console.log("Errore generico:", error.message);
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({ username: "", id: 0, status: false })
  }

  return (
    <div className='App'>
      {/* Ogni singola pagina viene passa prima nell'AuthContex */}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <div className='links'>

              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registrations">Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home Page</Link>
                  <Link to="/createpost">Create A Post</Link>
                </>
              )}
            </div>
            <div className='loggedInContainer'>
              <h1>{authState.username}</h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            {/* path="/" indica l'entrypoint del sito*/}
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registrations" exact element={<Registrations />} />
            <Route path="/login" exact element={<Login />} />
            {/* Questo deve essere l'ultimo route che inserisco */}
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
