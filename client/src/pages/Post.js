import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Post() {
    // Inserisci lo stesso parametro passato nella route 
    // In questo caso id, perchè la route è "/post/:id"
    let { id } = useParams()

    // Creo gli state
    const [postObject, setPostObject] = useState({ Likes: [] })
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { authState } = useContext(AuthContext)


    useEffect(() => {
        // Riceve il post selezionato
        axios.get(`/posts/byId/${id}`)
            .then((response) => {
                setPostObject(response.data.data)

                console.log("PostOBJ: " + postObject)
                console.log("respose: " + response.data.data)
            }).catch((error) => {
                if (error.response) {
                    alert("Errore dal server: " + error.response.data.message)
                } else {
                    console.log("Errore generico:", error.message);
                }
            }
            );

        // Ricavo i commenti del post selezionato
        axios.get(`/comments/${id}`)
            .then((response) => {
                setComments(response.data.data)
            }).catch((error) => {
                if (error.response) {
                    alert("Errore dal server: " + error.response.data.message)
                } else {
                    console.log("Errore generico:", error.message);
                }
            }
            );
    }, [id]);

    // Invio la richiesta al server, aggiungendo all'header il jwt
    const addComment = () => {
        axios.post("/comments", {
            commentBody: newComment,
            PostId: id
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            // Aggiunge direttamente il commento insieme alla lista di commenti creati
            const commentToAdd = { commentBody: newComment, username: response.data.data.username }
            // questa forma si chiama Array destructuring, prende la lista precedente e ne aggiungi di nuova in coda
            setComments([...comments, commentToAdd])
            setNewComment("") // Pulisco la stringa
        }).catch((error) => {
            if (error.response) {
                console.log("Errore dal server:", error.response.data.message);
                alert("Errore dal server: " + error.response.data.message)
            } else {
                console.log("Errore generico:", error.message);
            }
        })
    }

    const deleteComment = (id) => {
        axios.delete(`/comments/${id}`, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) => {
            // Tolgo il commento eliminato dalla commentList
            setComments(comments.filter((val) => {
                return val.id !== id
            }))
        }).catch((error) => {
            if (error.response) {
                console.log("Errore dal server:", error.response.data.message);
                alert("Errore dal server: " + error.response.data.message)
            } else {
                console.log("Errore generico:", error.message);
            }
        })
    }

    const likeAPost = (postId) => {
        axios.post("/likes", {
            PostId: postId
        }, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) => {
            alert(response.data.message)
            setPostObject((post) => {
                if (response.data.data.liked) {
                    // console.log("Post: " + post.title + ", Likes: " + post.Likes)
                    // Aggiungo un campo fittizio (0) in fondo alla lista del campo Likes
                    // In questo modo, nel display ci sarà il contatore che ne conta uno in più
                    return { ...post, Likes: [...post.Likes, 0] }
                } else {
                    const likeArray = [...post.Likes]
                    likeArray.pop() // Rimuove l'ultimo elemento della lista
                    return { ...post, Likes: likeArray }
                }
            })
        })
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div className='title'> {postObject.title}  </div>
                    <div className='body'> {postObject.postText} </div>
                    <div className='footer'> {postObject.username}
                        <button onClick={() => { likeAPost(postObject.id) }}> Like </button>
                        <label>{postObject.Likes.length}</label>
                    </div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    {/* In teoria dovresti fare anche qua form validation */}
                    {/* onChange permette di fare una post req del nuovo commento */}
                    <input type='text' placeholder='Comment...' autoComplete='off' value={newComment} onChange={(event) => { setNewComment(event.target.value) }} />
                    <button onClick={addComment}> Add Comment </button>
                </div>
                <div className='listOfComments'>
                    {comments.length === 0 ? (
                        <div className='comment'>Ancora nessun commento...</div>
                    ) : (
                        comments.map((comment, key) => (
                            <div key={key} className='comment'>
                                {comment.commentBody}
                                <label> Username: {comment.username} </label>
                                {/* Solo chi ha creato il commento può cancellarlo */}
                                {authState.username === comment.username && <button onClick={() => { deleteComment(comment.id) }}> X </button>}
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}

export default Post