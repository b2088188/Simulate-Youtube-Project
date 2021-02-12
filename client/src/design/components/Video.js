import styled from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';

const VIDEO_MODIFIERS = {
   round: () => `
	 border-radius: 50%;
	`
};

export const Video = styled.iframe`
   width: 100%;
   height: 100%;
   ${applyStyleModifiers(VIDEO_MODIFIERS)}
`;
