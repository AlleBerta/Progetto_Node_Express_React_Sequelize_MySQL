import React from 'react'
import axios from 'axios';
import { useEffect, useState} from 'react';

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

  // "proxy": "http://localhost:3001",
  useEffect(() => {
    axios.get('/posts')
      .then((response) => {
        // Aggiorno lo stato con i dati ricevuti
        setListOfPosts(response.data) 
      });
  }, []);

  return (
    <div>
        {
        listOfPosts.map((value, key)=>{ 
          return <div className='post'>
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