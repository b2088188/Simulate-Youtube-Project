import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

const IMAGE_MODIFIERS = {
  round: () => `
	 border-radius: 50%;
	`,
};

export const Image = styled.img`
  width: 100%;
  height: auto;
  ${applyStyleModifiers(IMAGE_MODIFIERS)}
`;
