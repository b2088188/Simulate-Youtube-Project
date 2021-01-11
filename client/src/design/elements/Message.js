import React from 'react';
import styled from 'styled-components';
import { Span } from '../components';
import { setFlex } from '../utils';
import { Alert, AlertTitle } from '@material-ui/lab';

const Message = ({ variant, text, severity = 'warning', full, className }) => {
   return (
      <Alert variant={variant} severity={severity} className={className}>
         <Span modifiers={['large', 'light']}>{text}</Span>
      </Alert>
   );
};

export default styled(Message)`
   ${setFlex({ x: 'center', y: 'center' })}
   width: 50%;
   margin: 2.5rem auto;
`;
