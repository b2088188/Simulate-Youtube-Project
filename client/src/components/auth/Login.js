import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FormContainer,
  Title,
  Span,
  Form,
  Label,
  Button,
} from '../../design/components';
import { useForm } from 'react-hook-form';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import AlertContext from '../../stores/alerts/alertContext';
import Alerts from '../../utils/alerts/Alerts';
import axios from 'axios';

const Login = () => {
  const { user, statusAuth, errorAuth } = useAuthState();
  const { fetchAuth } = useAuthActions();
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
    fetchAuth(axios.post('/api/v1/auth/login', values));
  }
  if (user) return <Redirect to={location.state?.from || '/'} />;

  return (
    <FormContainer>
      {/*<Alerts message = {error} />*/}
      <Title modifiers='big'>
        Account <Span modifiers='primary'>Login</Span>
      </Title>
      <Form onSubmit={handleSubmit(onLogin)}>
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
                message: 'Invalid email address',
              },
            })}
          />
          <p className='form__errormessage'>
            {errors.email && errors.email.message}
          </p>
        </Form.Group>
        <Form.Group vertical>
          <Label modifiers='large'>Password</Label>
          <Form.Input
            modifiers='outline'
            type='password'
            name='password'
            ref={register({
              required: 'You must specify a password',
            })}
          />
          <p className='form__errormessage'>
            {errors.password && errors.password.message}
          </p>
        </Form.Group>
        <Button modifiers='primary'>Login</Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
