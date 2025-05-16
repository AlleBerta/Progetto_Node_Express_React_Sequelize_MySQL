import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registrations from './pages/Registrations'
import { AuthContext } from './helpers/AuthContex'
import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  // Creo uno state per inserire il link di login / registration
  const [authState, setAuthState] = useState(false)

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
    })
      .then((response) => {
        // invio file json sempre con success: true/false
        if (!response.data.success) setAuthState(false)
        else setAuthState(true)
      })
      .catch((error) => {
        if (error.response) {
          setAuthState(false)
        } else {
          console.log("Errore generico:", error.message);
        }
      })

  }, [])

  return (
    <div className='App'>
      {/* Ogni singola pagina viene passa prima nell'AuthContex */}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create A Post</Link>
            {!authState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registrations">Registration</Link>
              </>
            )}
          </div>
          <Routes>
            {/* path="/" indica l'entrypoint del sito*/}
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registrations" exact element={<Registrations />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
