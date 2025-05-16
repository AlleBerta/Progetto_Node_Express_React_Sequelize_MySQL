import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContex'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext)

    let navigate = useNavigate()

    const login = () => {
        const data = { username: username, password: password }
        axios.post("/auth/login", data).then((response) => {
            // Crea un token di sessione visibile in devTools -> Application -> Local Storage 
            // Uso Local Storage perchè condivide il token tra le pagine del suo dominio
            localStorage.setItem("accessToken", response.data.token)
            // Modifica il valore dell'authState
            setAuthState(true)
            // redirect to home page
            navigate("/")
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