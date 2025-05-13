import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Post() {
    // Inserisci lo stesso parametro passato nella route 
    // In questo caso id, perchè la route è "/post/:id"
    let {id} = useParams()

    // Creo gli state
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    useEffect(()=>{
        // Riceve il post selezionato
        axios.get(`/posts/byId/${id}`)
        .then((response) => {
            setPostObject(response.data)
        });

        axios.get(`/comments/${id}`)
        .then((response) => {
            setComments(response.data)
        });
    }, [id]);

    // Aggiunge direttamente il commento insieme alla lista di commenti creati
    const addComment = ()=>{
        axios.post("/comments", {
            commentBody: newComment, PostId: id 
        }).then((response)=>{
            const commentToAdd = {commentBody: newComment}
            // questa forma si chiama Array destructuring, prende la lista precedente e ne aggiungi di nuova in coda
            setComments([...comments, commentToAdd])
            setNewComment("") // Pulisco la stringa
        })
    }

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
            <div className='addCommentContainer'>
                {/* In teoria dovresti fare anche qua form validation */}
                {/* onChange permette di fare una post req del nuovo commento */}
                <input type='text' placeholder='Comment...' autoComplete='off' value={newComment} onChange={(event)=>{setNewComment(event.target.value)}}/>
                <button onClick={addComment}> Add Comment </button>
            </div>
            <div className='listOfComments'>
                {comments.length === 0 ? (
                    <div className='comment'>Ancora nessun commento...</div>
                ) : (
                    comments.map((comment, key) => (
                    <div key={key} className='comment'>
                        {comment.commentBody}
                    </div>
                    ))
                )}
            </div>

        </div>
    </div>
  )
}

export default Post