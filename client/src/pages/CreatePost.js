import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';

function CreatePost() {
  // Bisogna inizializzare i campi, per poi passarli a Formik
  const initialValues = {
    title: '',
    postText: '',
    username: ''
  }

  // Oggetto che contiene ogni field del form, specifico che cosa voglio
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required()
  })

  const onSubmit = (data)=>{
    axios.post('/posts', data)
      .then((response) => {
        console.log("201 OK")
      });
  }

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className='formContainer'>
            <label>Title: </label>
            {/* Gestione dell'errrore nel campo definito nel name. 
            puoi anche decidere il tipo di elemento che contiene l'errore (span/div/ect..) */}
            <ErrorMessage name='title' component="span"/>
            {/* Nel name del Field inserisco il nome presente nel db di quel campo */}
            {/* autocomplete="off" permette di non avere l'auto-fill dei form. Si può anche togliere */}
            <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="Title"/>
            <label>Post: </label>
            <ErrorMessage name='postText' component="span"/>
            <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="Write post"/>
            <label>Username: </label>
            <ErrorMessage name='username' component="span"/>
            <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="write username"/>
            
            <button type='submit'>Create Post</button>
          </Form>
        </Formik>
    </div>
  )
}

export default CreatePost