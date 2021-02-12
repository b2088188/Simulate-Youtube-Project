import styled from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorPrimary, colorSecondary } from '../utils';

const SPAN_MODIFIERS = {
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
	secondary: () => `
color: ${colorSecondary.default};
  `
};

export const Span = styled.span`
	${applyStyleModifiers(SPAN_MODIFIERS)}
`;
