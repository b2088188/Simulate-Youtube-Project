import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorPrimary, setTransition } from '../utils';

const LABEL_MODIFIERS = {
   huge: () => `
		font-size: 3rem;
	`,
   big: () => `
		font-size: 2.5rem;
	`,
   large: () => `
		font-size: 2rem;
	`,
   medium: () => `
		font-size: 1.5rem;
	`,
   small: () => `
		font-size: 1rem;
	`,
   bold: () => `
		font-weight: 700
	`,
   regular: () => `
	   font-weight: 500	
	`,
   light: () => `
	  font-weight: 400
	`,
   exlight: () => `
	 font-weight: 300
	`,
   primary: () => `
	color: ${colorPrimary.default};
	`,
   bottomfill: () => `
    color: ${colorPrimary.default};
    background:none;
    border: none;
    border-bottom: solid .1rem ${colorPrimary.default}; 
    cursor: pointer;
    ${setTransition()}
    &:hover{
      color:#fff;
      background: ${colorPrimary.default};
    }
    &:focus{
    outline: none;
   }
	`
};

export const Label = styled.label`
   text-transform: capitalize;
   ${applyStyleModifiers(LABEL_MODIFIERS)}
`;
