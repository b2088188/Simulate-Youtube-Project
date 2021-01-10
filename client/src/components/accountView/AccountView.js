import React, { useContext } from 'react';
import styled from 'styled-components';
import {
   FormContainer,
   Title,
   Span,
   Form,
   Label,
   Button,
   Paragraph,
   ImageContainer,
   Image,
} from '../../design/components';
import { useAuthActions } from '../../stores/auth/authActionContext';
import { useForm } from 'react-hook-form';

const AccountView = ({ className }) => {
   const { register, errors, handleSubmit, reset } = useForm();
   const { fetchAuth } = useAuthActions();

   function onSubmit(values) {
      //updateUserData(values);
      reset();
   }

   return (
      <FormContainer onSubmit={handleSubmit} className={className}>
         {/*Update User Data*/}
         <Title modifiers='big'>Your Account Settings</Title>
         <Form.Group vertical>
            <Label modifiers='large'>Name</Label>
            <Form.Input
               modifiers='outline'
               type='text'
               name='name'
               ref={register({
                  required: 'You must specify an name',
               })}
            />
            <Paragraph>{errors.name && errors.name.message}</Paragraph>
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
            <Paragraph>{errors.email && errors.email.message}</Paragraph>
         </Form.Group>
         <Form.Group horizontal>
            <ImageContainer flexWidth='7.5'>
               <Image
                  modifiers='round'
                  src='https://s.ytimg.com/yts/img/avatar_48-vfllY0UTT.png'
               />
            </ImageContainer>
            <Form.Input
               type='file'
               ref={register}
               id='photo'
               name='photo'
               className='form__file'
            />
            <Label
               modifiers='bottomfill'
               className='form__filelabel'
               htmlFor='photo'
            >
               Choose New Photo
            </Label>
            <Button
               modifiers={['gradient', 'round']}
               className='form__submitbtn'
            >
               Save Settings
            </Button>
         </Form.Group>
      </FormContainer>
   );
};

export default styled(AccountView)`
   .form {
      &__file {
         display: none;
      }
      &__filelabel {
         align-self: center;
         margin-left: 2rem;
         padding: 1rem;
         margin-right: auto;
      }
      &__submitbtn {
         align-self: center;
      }
   }
`;
