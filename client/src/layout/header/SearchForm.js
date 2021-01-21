import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Icon, Button } from '../../design/components';
import { media } from '../../design/utils';
import SearchIcon from '@material-ui/icons/Search';
const SearchForm = ({ className }) => {
   const { register, handleSubmit } = useForm();
   const history = useHistory();

   function onSubmit({ term }) {
      history.push(`/results/?q=${term}`);
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)} className={className}>
         <Form.Group direction='row'>
            <Form.Input
               modifiers='round'
               type='text'
               name='term'
               placeholder='Search videos ...'
               ref={register({
                  required: "Search Term can't not be empty."
               })}
               className='search__input'
            ></Form.Input>
            <Button modifiers='transparent' className='search__icon'>
               <Icon as={SearchIcon} modifiers={['small']} />
            </Button>
         </Form.Group>
      </Form>
   );
};

export default styled(SearchForm)`
   ${media.phone(`
      order: 1;
      flex: 0 0 100%;
      background-color: var(--color-grey-light-2);
      `)}
   .search {
      &__input {
         width: 95%;
      }
      &__icon {
         margin-left: -5rem;
         ${media.phone(`
            margin-left: 0;
            `)}
      }
   }
`;
