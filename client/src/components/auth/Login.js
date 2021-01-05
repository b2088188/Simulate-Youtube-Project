import React, { useState, useEffect, useContext } from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useAuthActions} from '../../stores/auth/authActionContext';
import AlertContext from '../../stores/alerts/alertContext';
import Alerts from '../../utils/alerts/Alerts';
import axios from 'axios';




const Login = () => {
    const {user, statusAuth, errorAuth} = useAuthState();
    const {fetchAuth} = useAuthActions();
    const { generateAlert } = useContext(AlertContext);
    const { register, errors, handleSubmit } = useForm();
    const location = useLocation();
    
    // useEffect(() => {
    //     if (error) {
    //         generateAlert(error);
    //         clearError();
    //     }
    // }, [error])

    function onLogin(values) {
        fetchAuth(axios.post('/api/v1/auth/login', values))
    }
    if(user)
        return <Redirect to = {location.state?.from || '/'} />

    return (
        <div className = "form__container">
     {/*<Alerts message = {error} />*/}
      <h1 className="form__title">
         Account <span className = "form__title form__title--red">Login</span>
      </h1>
      <form className="form__box" onSubmit = {handleSubmit(onLogin)}>           
         <div className="form__group">
            <label className="form__text">Email</label>
            <input type="text" name = "email" className = "form__input" ref = {register({
               required: 'You must specify an email',
               pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
               }
            })} />
            <p className = "form__errormessage">
               {errors.email&&errors.email.message}
            </p>  
         </div>
         <div className="form__group">
            <label className="form__text">Password</label>
            <input type="password" name = "password" className = "form__input" ref = {register({
               required: 'You must specify a password'
            })} />
            <p className = "form__errormessage">
               {errors.password&&errors.password.message}
            </p>  
         </div>
         <button className="form__btn">Login</button>
      </form>
     </div>
    )
}

export default Login;