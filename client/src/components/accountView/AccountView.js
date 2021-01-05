import './accountview.scss';
import React, {useContext} from 'react';
import {useAuthActions} from '../../stores/auth/authActionContext';
import {useForm} from 'react-hook-form';
    

            
const AccountView = () => {
	const { register, errors, handleSubmit, reset } = useForm();
    const {fetchAuth} = useAuthActions();

   function onSubmit(values) {
   	//updateUserData(values);
    reset();
   }

	return (
     <div className = "account-view">
     	<form className = "account-form__container" onSubmit = {handleSubmit}>{/*Update User Data*/}
     	<h1 className = "account-form__title">Your Account Settings</h1>     		 
     	<div className="account-form__group">
            <label className="account-form__text">Name</label>
            <input type="text" name = "name" className = "account-form__input" ref = {register({
               required: 'You must specify an name'
            })}  />
              <p className = "form__errormessage">
               {errors.name&&errors.name.message}
            </p>
        </div>
     	<div className="account-form__group">
            <label className="account-form__text">Email</label>
            <input type="text" name = "email" className = "account-form__input" ref = {register({
               required: 'You must specify an email',
               pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
               }
            })}  />
              <p className = "form__errormessage">
               {errors.email&&errors.email.message}
            </p>
        </div>
        <div className = "account-form__imgbox">
        	<img src = "https://s.ytimg.com/yts/img/avatar_48-vfllY0UTT.png" className = "account-form__img" />
            <input type="file" className = "account-form__upload" ref = {register} id = "photo" name = "photo" />
        	<label htmlFor = "photo" className = "account-form__uploadbtn">Choose New Photo</label>
        </div>
        <button className = "account-form__savebtn">Save Settings</button>
     </form>
     </div>
		)
}

export default AccountView;