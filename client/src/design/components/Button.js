import styled from 'styled-components';
import {
  colorGrey,
  colorNormal,
  colorPrimary,
  setBorder,
  setTransition,
} from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

const BUTTON_MODIFIERS = {
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
   font-size: 1.2rem;
  `,
  full: () => `
    width: 100%;
    height: 100%;
    `,
  transparent: () => `
     background: none;
     color: ${colorGrey.dark1};
    `,
  outline: () => `
    background: none;
     color: ${colorGrey.light1};
    border: solid .1rem currentColor;
    `,
  round: () => `
    border-radius: 10rem;
    `,
  primary: () => `
        color: ${colorNormal.white};
        background: ${colorPrimary.dark};
        ${setTransition()}
        &--active{            
            color:var(--color-grey-dark-1);
            background:var(--color-grey-light-4);
        }
    `,
  secondary: () => `
      background: #0053B6;
       &:hover {
                background: #0086D8;
       }
    `,
  seablue: () => `
          background: #006994;
          &:hover {
              background: #008ab6;
          }
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

export const Button = styled.button`
  background: ${colorGrey.dark1};
  color: ${colorNormal.white};
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: 300;
  padding: 0.75rem 1.25rem;
  border: none;
  cursor: pointer;
  ${(props) => (props.color ? `background: ${props.color};` : null)}
  ${(props) => props.btop && setBorder({ position: 'border-top' })}

    &:focus {
    outline: none;
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
