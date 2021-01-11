import * as R from 'ramda';
import React, { useEffect, useContext, useRef } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
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

const Signup = () => {
  const { user, statusAuth, errorAuth } = useAuthState();
  const { fetchAuth } = useAuthActions();
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
    fetchAuth(axios.post('/api/v1/auth/signup', values));
  }

  if (user) return <Redirect to={location.state?.from || '/'} />;

  return (
    <FormContainer>
      <Alerts />
      <Title modifiers='big'>
        Account <Span modifiers='primary'>Signup</Span>
      </Title>
      <Form onSubmit={handleSubmit(onSignUp)}>
        <Form.Group vertical>
          <Label modifiers='large'>Name</Label>
          <Form.Input
            modifiers='outline'
            name='name'
            type='text'
            ref={register({
              required: 'You must specify a username',
            })}
          />
          <p className='form__errormessage'>
            {errors.name && errors.name.message}
          </p>
        </Form.Group>
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
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          <p className='form__errormessage'>
            {errors.password && errors.password.message}
          </p>
        </Form.Group>
        <Form.Group vertical>
          <Label modifiers='large'>Password Confirm</Label>
          <Form.Input
            modifiers='outline'
            type='password'
            name='passwordConfirm'
            ref={register({
              validate: (value) =>
                value === password.current ||
                'The passwords do no match, please try again',
            })}
          />
          <p className='form__errormessage'>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </p>
        </Form.Group>
        <Button modifiers='primary'>Signup</Button>
      </Form>
    </FormContainer>
  );
};

export default Signup;