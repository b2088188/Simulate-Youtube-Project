import styled from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { colorGrey } from 'design/utils';

const PARAGRAPH_MODIFIERS = {
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
	tini: () => `
		font-size: 1.3rem;
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
	`
};

export const Paragraph = styled.p`
	color: ${colorGrey.greydark1};
	font-size: 1.7rem;
	font-weight: 450;
	${applyStyleModifiers(PARAGRAPH_MODIFIERS)}
`;
