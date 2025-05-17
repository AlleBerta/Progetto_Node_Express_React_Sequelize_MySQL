import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Home() {

  // Uso l'hook per creare una variabile di stato (listOfPosts) dentro un componente React
  const [listOfPosts, setListOfPosts] = useState([])
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
    axios.get('/posts')
      .then((response) => {
        // Aggiorno lo stato con i dati ricevuti
        setListOfPosts(response.data.data)
      });
  }, []);

  const likeAPost = (postId) => {
    axios.post("/likes", {
      PostId: postId
    }, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    }).then((response) => {
      alert(response.data.message)
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
              {value.username} <button onClick={() => { likeAPost(value.id) }}> Like </button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default Home