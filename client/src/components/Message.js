import React from 'react';
import styled from 'styled-components/macro';
import { Span } from 'design/components';
import { setFlex, media } from 'design/utils';
import { Alert } from '@material-ui/lab';
import { Fade } from '@material-ui/core';

const Message = ({ variant, text, severity = 'warning', full, className }) => {
   return (
      <Alert
         variant={variant}
         severity={severity}
         css={`
            width: 50%;
            margin: 2.5rem auto;
            ${setFlex({ x: 'center', y: 'center' })}
            align-self: flex-start;
            ${media.phone(`
            width: 90%;
            `)}
         `}
      >
         <Span modifiers={['large', 'light']}>{text}</Span>
      </Alert>
   );
};

const CoverMessage = ({ variant, text, severity = 'warning', fade }) => {
   return (
      <Fade in={fade}>
         <Alert
            variant={variant}
            severity={severity}
            css={`
               position: fixed;
               top: 0;
               left: 0;
               margin: 0 25%;
               border-radius: 0 0 2.5rem 2.5rem;
               width: 50%;
               ${setFlex({ x: 'center', y: 'center' })}
            `}
         >
            <Span modifiers={['large', 'light']}>{text}</Span>
         </Alert>
      </Fade>
   );
};

export { Message, CoverMessage };
