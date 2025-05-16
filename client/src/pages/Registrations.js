import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import { handleLoginSuccess } from '../helpers/AuthHelpers';

function Registrations() {
    const { setAuthState } = useContext(AuthContext)
    let navigate = useNavigate()

    const initialValues = {
        username: '',
        password: ''
    }

    // Oggetto che contiene ogni field del form, specifico che cosa voglio
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    })

    const onSubmit = (data) => {
        axios.post("/auth", data).then((response) => {

            handleLoginSuccess(response.data.data, setAuthState, navigate)
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
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>
                    <label>Username: </label>
                    <ErrorMessage name='username' component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="write username"
                    />
                    <label>Password: </label>
                    <ErrorMessage name='password' component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="write password..."
                    />

                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registrations