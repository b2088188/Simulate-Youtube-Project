import React, { useEffect, useRef } from 'react';
import { useLocation, Redirect, useRouteMatch } from 'react-router-dom';
import { Col, FormContainer, Title, Span, Form, Label, Button } from '../../design/components';
import { useForm } from 'react-hook-form';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import { Message } from '../../design/elements';

const Signup = () => {
   const { user, isError, error } = useAuthState();
   const { signup, resetAuthError } = useAuthActions();
   const { register, errors, handleSubmit, watch } = useForm();
   const { url } = useRouteMatch();
   const password = useRef({});
   password.current = watch('password', '');
   const location = useLocation();

   useEffect(() => {
      resetAuthError();
   }, [resetAuthError, url]);

   // if (statusAuth === 'pending') return <Spinner />;
   if (user) return <Redirect to={location.state?.from || '/'} />;

   return (
      <Col width='12'>
         {isError && error ? <Message severity='error' text={error} /> : null}
         <FormContainer width={{ desktop: '50%', tabland: '70%', tabport: '90%' }}>
            <Title modifiers='big'>
               Account <Span modifiers='primary'>Signup</Span>
            </Title>
            <Form onSubmit={handleSubmit(signup)}>
               <Form.Group mb='1'>
                  <Label modifiers='large'>Name</Label>
                  <Form.Input
                     modifiers='outline'
                     name='name'
                     type='text'
                     ref={register({
                        required: 'You must specify a username'
                     })}
                  />
                  <p className='form__errormessage'>{errors.name && errors.name.message}</p>
               </Form.Group>
               <Form.Group mb='1'>
                  <Label modifiers='large'>Email</Label>
                  <Form.Input
                     modifiers='outline'
                     type='text'
                     name='email'
                     ref={register({
                        required: 'You must specify an email',
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: 'Invalid email address'
                        }
                     })}
                  />
                  <p className='form__errormessage'>{errors.email && errors.email.message}</p>
               </Form.Group>
               <Form.Group mb='1'>
                  <Label modifiers='large'>Password</Label>
                  <Form.Input
                     modifiers='outline'
                     type='password'
                     name='password'
                     ref={register({
                        required: 'You must specify a password',
                        minLength: {
                           value: 8,
                           message: 'Password must have at least 8 characters'
                        }
                     })}
                  />
                  <p className='form__errormessage'>{errors.password && errors.password.message}</p>
               </Form.Group>
               <Form.Group mb='1'>
                  <Label modifiers='large'>Password Confirm</Label>
                  <Form.Input
                     modifiers='outline'
                     type='password'
                     name='passwordConfirm'
                     ref={register({
                        validate: (value) =>
                           value === password.current ||
                           'The passwords do no match, please try again'
                     })}
                  />
                  <p className='form__errormessage'>
                     {errors.passwordConfirm && errors.passwordConfirm.message}
                  </p>
               </Form.Group>
               <Button modifiers='primary'>Signup</Button>
            </Form>
         </FormContainer>
      </Col>
   );
};

export default Signup;
