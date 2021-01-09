import styled from "styled-components";
import { colorGrey, setPadding, setMargin } from "../utils";
import { applyStyleModifiers } from "styled-components-modifiers";

const LINK_MODIFIERS = {
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
    font-weight: 700;
  `,
  regular: () => `
     font-weight: 500;
  `,
  light: () => `
    font-weight: 400;
  `,
  exlight: () => `
   font-weight: 300;
  `,
  round: () => `
    border-radius:10rem;    
  `,
  gradient: () => `
    color: #fff;
    background-image: linear-gradient(to right, var(--color-primary-light), var(--color-primary-dark));
    transition: all .25s;
    &:hover{
      color: #fff;
      background-image: linear-gradient(to right, var(--color-primary-dark), var(--color-primary-light));
      box-shadow: var(--shadow-dark-shallow);
    }
  `,
};

export const Link = styled.a`
  ${(props) =>
    props.pd
      ? setPadding({
          x: props.pd.x,
          y: props.pd.y,
        })
      : ""}
  ${(props) =>
    props.mg
      ? setMargin({
          x: props.mg.x,
          y: props.mg.y,
        })
      : ""}
  color: ${colorGrey.dark1};
  text-transform: capitalize;
  text-decoration: none;
  &:hover {
    color: ${colorGrey.dark1};
  }
  ${applyStyleModifiers(LINK_MODIFIERS)}
`;
