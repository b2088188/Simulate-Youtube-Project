import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
   Col,
   FormContainer,
   Title,
   Form,
   Label,
   Button,
   Paragraph,
   ImageContainer,
   Image,
   Input
} from 'design/components';
import useAuth from 'context/auth/authContext';
import { useUpdateUserData } from 'utils/user';
import { useForm } from 'react-hook-form';
import { CoverMessage } from 'components/Message';

const AccountView = ({ className }) => {
   const { register, errors, handleSubmit, setValue } = useForm();
   const [{ user }] = useAuth();
   const { update, isSuccess: isUpdateSuccess } = useUpdateUserData();
   const [showAlert, setShowAlert] = useState(false);

   useEffect(() => {
      if (user) {
         setValue('name', user.name);
         setValue('email', user.email);
      }
   }, [user, setValue]);

   useEffect(() => {
      if (user && isUpdateSuccess) {
         setShowAlert(true);
         const timer = setTimeout(() => {
            setShowAlert(false);
         }, 1000);
         return () => clearTimeout(timer);
      }
   }, [user, isUpdateSuccess]);

   return (
      <Col width='12' className={className}>
         {isUpdateSuccess && showAlert ? (
            <CoverMessage text='Update Successfully' severity='success' fade={showAlert} />
         ) : null}
         <FormContainer width={{ desktop: '50%', tabland: '70%', tabport: '90%' }} my='2'>
            <Title modifiers='big'>Your Account Settings</Title>
            <Form onSubmit={handleSubmit(update)}>
               <Form.Group mb='1'>
                  <Label modifiers='large'>Name</Label>
                  <Input
                     type='text'
                     name='name'
                     ref={register({
                        required: 'You must specify an name'
                     })}
                  />
                  <Paragraph>{errors.name && errors.name.message}</Paragraph>
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
                  <Paragraph>{errors.email && errors.email.message}</Paragraph>
               </Form.Group>
               <Form.Group direction='row'>
                  <ImageContainer width={{ desktop: '5rem' }}>
                     <Image
                        modifiers='round'
                        src={`${process.env.REACT_APP_BACKEND_URL}/assets/users/default.jpg`}
                     />
                  </ImageContainer>
                  <Input
                     type='file'
                     ref={register}
                     id='photo'
                     name='photo'
                     className='form__file'
                  />
                  <Label modifiers='bottomfill' className='form__filelabel' htmlFor='photo'>
                     Choose New Photo
                  </Label>
                  <Button modifiers={['gradient', 'round']} className='form__submitbtn'>
                     Save Settings
                  </Button>
               </Form.Group>
            </Form>
         </FormContainer>
      </Col>
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
