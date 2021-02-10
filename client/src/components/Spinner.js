import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorGrey } from 'design/utils';

const SPINNER_MODIFIERS = {
   light: () => `
    color: ${colorGrey.light1};
  `,
   dark: () => `
  color: ${colorGrey.dark2};
  `,
   noSpace: () => `
  margin: 0;
  `
};
const Spinner = ({ className }) => {
   return <CircularProgress className={className} />;
};

export default styled(Spinner)`
   margin: 5rem auto;
   .MuiCircularProgress-root {
   }
   ${applyStyleModifiers(SPINNER_MODIFIERS)}
`;

export { Spinner };
