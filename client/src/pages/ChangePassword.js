import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ChangePassword() {

    let navigate = useNavigate()

    const initialValues = {
        oldPassword: '',
        newPassword: ''
    }

    // Oggetto che contiene ogni field del form, specifico che cosa voglio
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(4).max(20).required("Old Password is required."),
        newPassword: Yup.string().min(4).max(20).required("New Password is Required.")
    })

    const ChangePassword = (data) => {
        axios.put("/auth/changepassword", data, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) => {
            alert("Password Cambiata!")
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
        <div>
            <h1>Change Your Password</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={ChangePassword}
                validationSchema={validationSchema}
            >
                {({ values }) => (
                    <Form className='formContainer' >
                        {console.log("Formik values:", values)}
                        <label>Old Password:</label>
                        <ErrorMessage name='oldPassword' component="span" />
                        <Field
                            autoComplete="off"
                            type="password"
                            id="inputOldPassword"
                            name="oldPassword"
                            placeholder="Old Password..."
                        />
                        <label>New Password:</label>
                        <ErrorMessage name='newPassword' component="span" />
                        <Field
                            autoComplete="off"
                            type="password"
                            id="inputNewPassword"
                            name="newPassword"
                            placeholder="New Password..."
                        />
                        {/* <input type='text' placeholder='Old Password...' onChange={(event) => { setOldPassword(event.target.value) }} /> */}
                        {/* <input type='text' placeholder='New Password...' onChange={(event) => { setNewPassword(event.target.value) }} /> */}
                        <button type='submit'> Set New Password </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePassword