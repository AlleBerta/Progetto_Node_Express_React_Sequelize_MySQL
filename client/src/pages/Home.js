import React, { useContext } from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { AuthContext } from '../helpers/AuthContext'

function Home() {

  // Uso l'hook per creare una variabile di stato (listOfPosts) dentro un componente React
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState(false); // hook per gestire l'icona del mi piace  
  const { authState } = useContext(AuthContext)
  // Permette di run immediatamente una func quando la pagina si carica 
  // Dopo la funizone puoi passare una lista di dipendenze di stati
  // Se la lista è vuota dice a React di eseguire la funzione solo una volta
  /** es altro use-case:
   *  useEffect(() => {
   *    console.log("Eseguo ogni volta che cambia 'count'");
   *  }, [count]);
   */

  let navigate = useNavigate()


  // "proxy": "http://localhost:3001",
  useEffect(() => {

    // Controlla se è presente l'access token qualsiasi, se non lo è lo reindirizza al login
    // Il vero controllo avviene dopo
    if (!localStorage.getItem("accessToken")) {
      navigate("/login")
    } else {
      axios.get('/posts', {
        headers: { accessToken: localStorage.getItem('accessToken') }
      }).then((response) => {
        // Aggiorno lo stato con i dati ricevuti
        setListOfPosts(response.data.data.listOfPosts)
        setLikedPosts(response.data.data.likedPosts.map((like) => { return like.PostId }))
      });
    }

  }, [authState.status, navigate]);

  const likeAPost = (postId) => {
    axios.post("/likes", {
      PostId: postId
    }, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    }).then((response) => {
      // alert(response.data.message)
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.data.liked) {
            // console.log("Post: " + post.title + ", Likes: " + post.Likes)
            // Aggiungo un campo fittizio (0) in fondo alla lista del campo Likes
            // In questo modo, nel display ci sarà il contatore che ne conta uno in più
            return { ...post, Likes: [...post.Likes, 0] }
          } else {
            const likeArray = post.Likes
            likeArray.pop() // Rimuove l'ultimo elemento della lista
            return { ...post, Likes: likeArray }
          }
        } else {
          return post
        }
      }))

      // Aggiorno anche l'icona del like
      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter((id) => { return id !== postId })) // restituisco tutti i post tranne quello in cui ho cliccato il bottone
      } else {
        setLikedPosts([...likedPosts, postId]) // aggiungo il post likeato alla lista
      }
    }
    )
  }

  return (
    <div>
      {
        listOfPosts.map((value, key) => {
          return <div key={value.id} className='post' >
            <div className='title'>{value.title}</div>
            <div className='body' onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
            <div className='footer'>
              <div className='username'> {value.username} </div>
              <div className='buttons'>
                {likedPosts.includes(value.id) ? (
                  <ThumbUpAltIcon onClick={() => { likeAPost(value.id) }} />
                ) : (
                  <ThumbUpAltOutlinedIcon onClick={() => { likeAPost(value.id) }} />
                )}
              </div>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Home