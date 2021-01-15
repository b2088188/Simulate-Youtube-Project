import styled from 'styled-components';
import { color } from 'styled-system';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorGrey, colorPrimary } from '../utils';

const TITLE_MODIFIERS = {
   huge: () => `
		font-size: 3.5rem;
	`,
   big: () => `
		font-size: 3rem;
	`,
   large: () => `
		font-size: 2.5rem;
	`,
   medium: () => `
		font-size: 2rem;
	`,
   small: () => `
		font-size: 1.5rem;
	`,
   mini: () => `
	   font-size: 1.2rem;
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
	`
};

export const Title = styled.h1`
   ${color}
   font-size: 1.7rem;
   line-height: 1.2;
   letter-spacing: 0.1rem;
   margin: 0;
   text-transform: capitalize;
   ${applyStyleModifiers(TITLE_MODIFIERS)}
`;
