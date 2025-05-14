import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';

function Registrations() {

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
        axios.post("/auth", data).then(() => {
            console.log(data)
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
                <ErrorMessage name='username' component="span"/>
                <Field 
                    autocomplete="off" 
                    id="inputCreatePost" 
                    name="username" 
                    placeholder="write username"
                />
                <label>Password: </label>
                <ErrorMessage name='password' component="span"/>
                <Field 
                    autocomplete="off" 
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