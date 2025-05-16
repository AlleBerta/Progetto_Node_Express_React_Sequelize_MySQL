import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import { handleLoginSuccess } from '../helpers/AuthHelpers'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext)

    let navigate = useNavigate()

    const login = () => {
        const data = { username: username, password: password }
        axios.post("/auth/login", data).then((response) => {
            // Creo token di sessione + aggiorno l'hook di autenticazione, infine faccio redirect to home page
            const enrichedData = {
                ...data,                        // username e password
                token: response.data.data.token // nuovo campo aggiunto
            };
            handleLoginSuccess(enrichedData, setAuthState, navigate)
        }).catch((error) => {
            if (error.response) {
                console.log("Errore dal server:", error.response.data.message);
                alert("Errore dal server: " + error.response.data.message)
            } else {
                console.log("Errore generico:", error.message);
            }
        })
    }
    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input
                type="text"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}> Login </button>
        </div>
    )
}

export default Login