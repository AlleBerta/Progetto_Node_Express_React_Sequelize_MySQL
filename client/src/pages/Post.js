import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Post() {
    // Inserisci lo stesso parametro passato nella route 
    // In questo caso id, perchè la route è "/post/:id"
    let {id} = useParams()
    const [postObject, setPostObject] = useState({})
    useEffect(()=>{
        axios.get(`/posts/byId/${id}`)
        .then((response) => {
            setPostObject(response.data)
        });
    })
  return (
    <div className='postPage'>
        <div className='leftSide'>
            <div className='post' id='individual'>
                <div className='title'> {postObject.title}  </div>
                <div className='body'> {postObject.postText} </div> 
                <div className='footer'> {postObject.username} </div>
            </div>
        </div>
        <div className='rightSide'>
            comment section
        </div>
    </div>
  )
}

export default Post