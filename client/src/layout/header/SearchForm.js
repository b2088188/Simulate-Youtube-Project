import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Form, Icon, Button, Input } from 'design/components';
import { media, colorGrey } from 'design/utils';
import { Search } from '@material-ui/icons';

const SearchForm = ({ className }) => {
   const { register, handleSubmit } = useForm();
   const history = useHistory();

   function onSubmit({ term }) {
      history.push(`/results/?q=${term}`);
   }

   return (
      <Form
         onSubmit={handleSubmit(onSubmit)}
         css={`
            ${media.phone(`
      order: 1;
      flex: 0 0 100%;
      background-color: ${colorGrey.light2};
      `)}
         `}
      >
         <Form.Group direction='row'>
            <Input
               type='text'
               name='term'
               placeholder='Search videos ...'
               ref={register({
                  required: "Search Term can't not be empty."
               })}
               css={`
                  border-radius: 10rem;
                  width: 95%;
               `}
            />
            <Button
               modifiers='transparent'
               css={`
                  margin-left: -5rem;
                  ${media.phone(`
                  margin-left: 0;
                 `)}
               `}
            >
               <Icon as={Search} modifiers='small' />
            </Button>
         </Form.Group>
      </Form>
   );
};

export default SearchForm;
