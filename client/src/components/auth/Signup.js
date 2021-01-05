import * as R from 'ramda';
import React, { useEffect, useContext, useRef } from 'react';
import {useLocation, Redirect} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useAuthState} from '../../stores/auth/authStateContext';
import {useAuthActions} from '../../stores/auth/authActionContext';
import AlertContext from '../../stores/alerts/alertContext';
import Alerts from '../../utils/alerts/Alerts';
import axios from 'axios';




const Signup = () => {
    const {user, statusAuth, errorAuth} = useAuthState();
    const {fetchAuth} = useAuthActions();
    const { generateAlert } = useContext(AlertContext);
    const { register, errors, handleSubmit, reset, watch } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    const location = useLocation();


    // useEffect(() => {
    //     if (error) {
    //         generateAlert(error);
    //         clearError();
    //     }
    // }, [error])

    function onSignUp(values) {
       fetchAuth(axios.post('/api/v1/auth/signup', values))
    }

      if(user)
        return <Redirect to = {location.state?.from || '/'} />

    return (
        <div className = "form__container">     
     <Alerts />
      <h1 className="form__title">
         Account <span className = "form__title form__title--red">Signup</span>
      </h1>
      <form className="form__box" onSubmit = {handleSubmit(onSignUp)}>
         <div className="form__group">
            <label className="form__text">Name</label>
            <input name = "name" type="text" className = "form__input" ref = {register({
               required: 'You must specify a username'
            })} />
            <p className = "form__errormessage">
               {errors.name&&errors.name.message}
            </p>  
         </div>
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
               required: 'You must specify a password',
               minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
               }
            })} />
            <p className = "form__errormessage">
               {errors.password&&errors.password.message}
            </p>  
         </div>
         <div className="form__group">
            <label className="form__text">Password Confirm</label>
            <input type="password" name = "passwordConfirm" className = "form__input" ref = {register({
                   validate: value => value === password.current || 'The passwords do no match, please try again'
            })} />
            <p className = "form__errormessage">
               {errors.passwordConfirm&&errors.passwordConfirm.message}
            </p>  
         </div>
         <button className="form__btn">Signup</button>
      </form>      
     </div>
    )
}

export default Signup;