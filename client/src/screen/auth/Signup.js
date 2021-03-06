import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { useLocation, Redirect } from 'react-router-dom';
import { Col, FormContainer, Title, Span, Form, Label, Button, Input } from 'design/components';
import { useForm } from 'react-hook-form';
import useAuth from 'context/auth/authContext';
import { Message } from 'components/Message';

const Signup = () => {
   const [{ user, isError, error }, { signup, setError }] = useAuth();
   const { register, errors, handleSubmit, watch } = useForm();
   const password = useRef({});
   password.current = watch('password', '');
   const location = useLocation();

   useEffect(() => {
      return () => setError(null);
   }, [setError]);

   // if (statusAuth === 'pending') return <Spinner />;
   if (user) return <Redirect to={location.state?.from || '/'} />;

   return (
      <Col width='12'>
         {isError && error ? <Message severity='error' text={error} /> : null}
         <FormContainer
            css={`
               margin-top: 5rem;
            `}
            width={{ desktop: '50%', tabland: '70%', tabport: '90%' }}
         >
            <Title modifiers='big'>
               Account <Span modifiers='primary'>Signup</Span>
            </Title>
            <Form onSubmit={handleSubmit(signup)}>
               <Form.Group mb='1'>
                  <Label modifiers='large'>Name</Label>
                  <Input
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
                  <Input
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
                  <Input
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
                  <Input
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
