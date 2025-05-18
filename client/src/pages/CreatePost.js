import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {

  const { authState } = useContext(AuthContext)
  let navigate = useNavigate()

  // Bisogna inizializzare i campi, per poi passarli a Formik
  const initialValues = {
    title: '',
    postText: ''
  }

  useEffect(() => {
    // Controlla se l'utente è loggato o meno, se non lo è lo reindirizza al login
    if (!authState.status) {
      navigate("/login")
    }
  })

  // Oggetto che contiene ogni field del form, specifico che cosa voglio
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  })

  const onSubmit = (data) => {
    console.log(data)
    axios.post('/posts', data, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    }).then((response) => {
      navigate('/') // redirect to home page
    }).catch((error) => {
      if (error.response) {
        alert("Errore dal server: " + error.response.data.message)
      } else {
        console.log("Errore generico:", error.message);
      }
    });
  }

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Title: </label>
          {/* Gestione dell'errrore nel campo definito nel name. 
            puoi anche decidere il tipo di elemento che contiene l'errore (span/div/ect..) */}
          <ErrorMessage name='title' component="span" />
          {/* Nel name del Field inserisco il nome presente nel db di quel campo */}
          {/* autocomplete="off" permette di non avere l'auto-fill dei form. Si può anche togliere */}
          <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="Title" />
          <label>Post: </label>
          <ErrorMessage name='postText' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="postText" placeholder="Write post" />

          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost