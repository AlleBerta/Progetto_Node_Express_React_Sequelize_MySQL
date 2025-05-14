import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registrations from './pages/Registrations'

function App() {

  return (
    <div className='App'>
      <Router>
        <div className='navbar'>
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create A Post</Link>
          <Link to="/login">Login</Link>
          <Link to="/registrations">Registration</Link>
        </div>
        <Routes>
          {/* path="/" indica l'entrypoint del sito*/}
          <Route path="/" exact element={<Home />}/>
          <Route path="/createpost" exact element={<CreatePost />}/>
          <Route path="/post/:id" exact element={<Post />}/>
          <Route path="/registrations" exact element={<Registrations />}/>
          <Route path="/login" exact element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
