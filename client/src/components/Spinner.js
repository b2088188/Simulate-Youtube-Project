import React from 'react';
import styled, { css } from 'styled-components';
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

const Spinner = styled(CircularProgress)`
   margin: 5rem auto;
   ${applyStyleModifiers(SPINNER_MODIFIERS)}
`;

export { Spinner };
