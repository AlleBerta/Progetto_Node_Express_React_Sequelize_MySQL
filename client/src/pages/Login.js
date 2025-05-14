import React, { useState } from 'react'
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const login = () => {
        const data = { username: username, password: password }
        axios.post("/auth/login", data).then((response) => {
            console.log(response.data.message)
        })
            .catch((error) => {
                if (error.response) {
                    console.log("Errore dal server:", error.response.data.message);
                } else {
                    console.log("Errore generico:", error.message);
                }
            })
    }
    return (
        <div>
            <input
                type='text'
                onChange={(event) => {
                    setUsername(event.target.value)
                }}
            />

            <input
                type='password'
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />

            <button onClick={login}> Login </button>
        </div>
    )
}

export default Login