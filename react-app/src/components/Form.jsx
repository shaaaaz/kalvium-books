// importing hooks to use them
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// importing bg images and other useful components
import backgroundImage from '../images/bg7.jpg'

import SignUpButton from './SignUpButton'

// functional component
function Form() {


    // use navigate to redirect to home page
    const navigate = useNavigate();

    // using useState to assign formdata as object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [alerts, setAlerts] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    // to check how far ur regsitartion process is and only redirect when everything is done
    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    // store value in formData when there is change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((preData) => ({ ...preData, [name]: value }))
    }

    // check if regisartion is completed
    useEffect(() => {
        if (registrationSuccess) {
            console.log(formData)
            alert("Registration Succesfull!")
            navigate('/');
        }
    }, [registrationSuccess]);

    // we have to give alerts to the user 
    const handleSubmit = (e) => {
        e.preventDefault()

        // new object to store alert data 
        const newAlerts = {}


        // conditions  for input by the user
        if (formData.name == "") {
            newAlerts.name = "Please enter your name"
        }
        else if (formData.name.length < 3) {
            newAlerts.name = "Name must be atleast 3 Letters"
        }
        else if (formData.name.length > 20) {
            newAlerts.name = "Name cannot be graater than 20 letters"
        }
        else {
            newAlerts.name = ""
        }

        if (formData.email == "" || !formData.email.includes('@')) {
            newAlerts.email = "Please enter your correct email"
        }
        else {
            newAlerts.email = ""
        }

        if (formData.password == "") {
            newAlerts.password = "Please Enter your password"
        }
        // function that checks special charcter
        else if (formData.password.length < 10 || !checkForSpecialCharacter(formData.password)) {
            newAlerts.password = "Password must have 10 Letttrs with atleast 1 special character"
        }
        else {
            newAlerts.password = ""
        }

        if (formData.repeatPassword != formData.password) {
            newAlerts.repeatPassword = "Please enter the Correct Password"
        }
        else if (formData.repeatPassword == "") {
            newAlerts.repeatPassword = "Please Enter your Password"
        }
        else {
            newAlerts.repeatPassword = ""
        }

        setAlerts(newAlerts)

        // if there are no alerts we set registartion to be true 
        if (newAlerts.name == "" &&
            newAlerts.email == "" &&
            newAlerts.password == "" &&
            newAlerts.repeatPassword == "") {
            setRegistrationSuccess(true)
        }
    }

    // check for specail character in the string 
    const checkForSpecialCharacter = (string) => {
        let condition = /^[a-zA-Z0-9]*[^a-zA-Z0-9][a-zA-Z0-9]*$/
        return condition.test(string)
    }

    return (
        <>
            {/* bg image */}
            <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />

            <div className="form">
                <div className="formArea">

                    <h1 className="formHeading">Registration Form</h1>

                    {/* form Area */}
                    <form onSubmit={handleSubmit}>

                        <div className="label">Name</div>
                        {/* input box with proper types for data from the user  */}
                        <input type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='forminput'
                            placeholder="Enter your name">
                        </input>

                        <div className="alert">
                            {alerts.name}
                        </div>


                        <div className="label">Email</div>
                        <input type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='forminput'
                            placeholder="Enter your Email">
                        </input>

                        <div className="alert">
                            {alerts.email}
                        </div>


                        <div className="label">Password</div>
                        <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='forminput'
                            placeholder="Enter your name">
                        </input>

                        <div className="alert">
                            {alerts.password}
                        </div>


                        <div className="label">Confirm Password</div>
                        <input type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className='forminput'>
                        </input>

                        <div className="alert">
                            {alerts.repeatPassword}
                        </div>

                        {/* only visible to be able to recirect when registration ois sett to true */}
                        {registrationSuccess &&
                            <Link to='/'>
                                <SignUpButton />
                            </Link>
                        }

                        {!registrationSuccess &&
                            <SignUpButton />
                        }


                    </form>
                </div>

                <div className="formBack">

                </div>

            </div>
        </>
    )
}

export default Form