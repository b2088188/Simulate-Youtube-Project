import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../stores/auth/authContext';
import AlertContext from '../../stores/alerts/alertContext';
import Alerts from '../../utils/alerts/Alerts';





const Login = ({
    history
}) => {
    const { login, isAuth, error, clearError } = useContext(AuthContext);
    const { generateAlert } = useContext(AlertContext);
    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        if (isAuth)
            history.goBack();
    }, [isAuth])
    useEffect(() => {
        if (error) {
            generateAlert(error);
            clearError();
        }
    }, [error])

    return (
        <div className = "form__container">
     <Alerts message = {error} />
      <h1 className="form__title">
         Account <span className = "form__title form__title--red">Login</span>
      </h1>
      <form className="form__box" onSubmit = {handleSubmit(login)}>           
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