import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Profile() {

    const [username, setUsername] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    const { authState } = useContext(AuthContext)

    let navigate = useNavigate()
    let { id } = useParams()

    useEffect(() => {
        axios.get(`/auth/basicinfo/${id}`)
            .then((response) => {
                setUsername(response.data.data.username)
            })
            .catch((error) => {
                alert("Errrore:")
                if (error.response) {
                    console.log("Errore dal server:", error.response.data.message);
                    alert("Errore dal server: " + error.response.data.message)
                } else {
                    console.log("Errore generico:", error.message);
                }
            })

        axios.get(`/posts/byUserId/${id}`)
            .then((response) => {
                setListOfPosts(response.data.data)
            }).catch((error) => {
                alert("Errrore:")
                if (error.response) {
                    console.log("Errore dal server:", error.response.data.message);
                    alert("Errore dal server: " + error.response.data.message)
                } else {
                    console.log("Errore generico:", error.message);
                }
            })
    }, [id])
    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>Username: {username}</h1>
                {authState.username === username && (
                    <button onClick={() => { navigate("/changepassword") }}> Change My Password </button>
                )}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return <div key={value.id} className='post' >
                        <div className='title'>{value.title}</div>
                        <div className='body' onClick={() => { navigate(`/post/${value.id}`) }}>{value.postText}</div>
                        <div className='footer'>
                            <div className='username'> {value.username} </div>
                            <label>{value.Likes.length} </label>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default Profile