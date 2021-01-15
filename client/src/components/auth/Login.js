import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Col, FormContainer, Title, Span, Form, Label, Button } from '../../design/components';
import { useForm } from 'react-hook-form';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import AlertContext from '../../stores/alerts/alertContext';
import Alerts from '../../utils/alerts/Alerts';
import axios from 'axios';

const Login = () => {
   const { user, statusAuth, errorAuth } = useAuthState();
   const { login } = useAuthActions();
   const { generateAlert } = useContext(AlertContext);
   const { register, errors, handleSubmit } = useForm();
   const location = useLocation();

   if (user) return <Redirect to={location.state?.from || '/'} />;

   return (
      <Col width = '12'>         
      <FormContainer width = {{desktop: '50%', tabland: '70%', tabport: '90%'}}>
         <Title modifiers='big'>
            Account <Span modifiers='primary'>Login</Span>
         </Title>
         <Form onSubmit={handleSubmit(login)}>
            <Form.Group vertical>
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
            <Form.Group vertical>
               <Label modifiers='large'>Password</Label>
               <Form.Input
                  modifiers='outline'
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
