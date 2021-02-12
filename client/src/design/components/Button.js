import styled from 'styled-components/macro';
import {
   colorGrey,
   colorNormal,
   colorPrimary,
   setBorder,
   setTransition,
   setPadding,
   media
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
     color: currentColor;
     padding: 0;
    `,
   outline: () => `
    background: none;
     color: currentColor;
    border: solid .1rem currentColor;
    `,
   round: () => `
    border-radius: 10rem;
    `,
   disable: () => `
     color: ${colorGrey.dark3};
     background: ${colorGrey.light4};
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
  `
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

   // padding
   ${({ pd }) => (pd && typeof pd === 'string' ? setPadding({ x: pd, y: pd }) : null)}
   ${({ pd }) => (pd && pd.desktop ? setPadding({ x: pd.desktop, y: pd.desktop }) : null)}
   ${({ pd }) =>
      pd && pd.tabland ? media.tabland(setPadding({ x: pd.tabland, y: pd.tabland })) : null}
   ${({ pd }) =>
      pd && pd.tabport ? media.tabport(setPadding({ x: pd.tabport, y: pd.tabport })) : null}
   ${({ pd }) => (pd && pd.phone ? media.phone(setPadding({ x: pd.phone, y: pd.phone })) : null)}
${({ pdXY }) => (pdXY && typeof pdXY === 'object' ? setPadding({ x: pdXY.x, y: pdXY.y }) : null)}
 ${({ pdXY }) =>
      pdXY && pdXY.desktop ? setPadding({ x: pdXY.desktop.x, y: pdXY.desktop.y }) : null}
   ${({ pdXY }) =>
      pdXY && pdXY.tabland
         ? media.tabland(setPadding({ x: pdXY.tabland.x, y: pdXY.tabland.y }))
         : null}
   ${({ pdXY }) =>
      pdXY && pdXY.tabport
         ? media.tabport(setPadding({ x: pdXY.tabport.x, y: pdXY.tabport.y }))
         : null}
   ${({ pdXY }) =>
      pdXY && pdXY.phone ? media.phone(setPadding({ x: pdXY.phone.x, y: pdXY.phone.y })) : null}
   // padding-top
   ${({ pdTop }) => (pdTop && typeof pdTop === 'string' ? `padding-top: ${pdTop};` : null)}
   ${({ pdTop }) => (pdTop && pdTop.desktop ? `padding-top: ${pdTop.desktop};` : null)}
   ${({ pdTop }) =>
      pdTop && pdTop.tabland ? media.tabland(`padding-top: ${pdTop.tabland};`) : null}
   ${({ pdTop }) =>
      pdTop && pdTop.tabport ? media.tabport(`padding-top: ${pdTop.tabport};`) : null}
   ${({ pdTop }) => (pdTop && pdTop.phone ? media.phone(`padding-top: ${pdTop.phone};`) : null)}
   // background-color
   ${(props) => (props.color ? `background: ${props.color};` : null)}
   ${(props) => props.btop && setBorder({ position: 'border-top' })}

    &:focus {
      outline: none;
   }
   ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
