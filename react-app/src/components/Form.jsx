import { useForm } from 'react-hook-form'
import { useState } from 'react'

import backgroundImage from '../images/bg4.png'


function Form() {

    const [submission, setSubmission] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (values) => {
        setSubmission(true)
    }

    return (
        <>
                    <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />

            <div className="center">

                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    {submission && <p>Registration Successfull!</p>}

                    <label>First Name:</label>
                    <input type="text " 
                           name='firstName' 
                           {...register("firstName", { required: 'First name is Required!' })} />

                    {errors.firstName && <p>{errors.firstName.message}</p>}

                    <label>Last Name:</label>
                    <input type="text " 
                           name='lastName' 
                           {...register("lastName", { required: 'Last name is Required!' })} />

                    {errors.lastName && <p>{errors.lastName.message}</p>}

                    <label>Email:</label>
                    <input type="type " 
                           name='email' 
                           {...register("email", { required: 'Email is Required!', 
                           pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }, })} />

                    {errors.email && <p>{errors.email.message}</p>}

                    <label>Password:</label>
                    <input type="password " 
                           name='password' 
                           {...register("password", { required: 'Password is Required!', 
                           minLenght: { value: 5, message: "Password must be more that 4 characters" }, 
                           maxLength: { value: 5, message: "Password must be more than 20 chararcters" } })} />
                    {errors.password && <p>{errors.password.message}</p>}

                    <input type="submit" value="SUBMIT" className='button' />
                </form>
            </div>
        </>
    )
}

export default Form