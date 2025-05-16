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

  return (
    <div>
      {
        listOfPosts.map((value, key) => {
          return <div key={value.id} className='post' onClick={() => { navigate(`/post/${value.id}`) }}>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>
        })
      }
    </div>
  )
}

export default Home