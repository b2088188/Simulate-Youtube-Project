import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Redirect, useLocation } from 'react-router-dom';
import { Col, FormContainer, Title, Span, Form, Label, Button, Input } from 'design/components';
import { useForm } from 'react-hook-form';
import useAuth from 'context/auth/authContext';
import { Message } from 'components/Message';

const Login = () => {
   const [{ user, isError, error }, { login, setError }] = useAuth();
   const { register, errors, handleSubmit } = useForm();
   const location = useLocation();

   useEffect(() => {
      return () => setError(null);
   }, [setError]);

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
               Account <Span modifiers='primary'>Login</Span>
            </Title>
            <Form onSubmit={handleSubmit(login)}>
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
                        required: 'You must specify a password'
                     })}
                  />
                  <p className='form__errormessage'>{errors.password && errors.password.message}</p>
               </Form.Group>
               <Button modifiers='primary'>Login</Button>
            </Form>
         </FormContainer>
      </Col>
   );
};

export default Login;
