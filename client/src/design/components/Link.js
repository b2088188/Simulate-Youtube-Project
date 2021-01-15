import styled from 'styled-components';
import { flexBox } from 'styled-system';
import { colorGrey, setPadding, setMargin, setFlex, setFlexWidth, media } from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

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
  `
};

export const Link = styled.a`
   //Padding
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
   // margin-right
   ${({ mr }) => (mr && typeof mr === 'string' ? `margin-right: ${mr};` : null)}
   ${({ mr }) => (mr && mr.desktop ? `margin-right: ${mr.desktop};` : null)}
   ${({ mr }) => (mr && mr.tabland ? media.tabland(`margin-right: ${mr.tabland};`) : null)}
   ${({ mr }) => (mr && mr.tabport ? media.tabport(`margin-right: ${mr.tabport};`) : null)}
   ${({ mr }) => (mr && mr.phone ? media.phone(`margin-right: ${mr.phone};`) : null)}
   // Flex & align-items
   ${({ alignItems }) =>
      alignItems && typeof alignItems === 'string' ? setFlex({ y: alignItems }) : null}
   ${({ alignItems }) =>
      alignItems && alignItems.desktop ? setFlex({ y: alignItems.desktop }) : null}
   ${({ alignItems }) =>
      alignItems && alignItems.tabland ? media.tabland(setFlex({ y: alignItems.tabland })) : null}
   ${({ alignItems }) =>
      alignItems && alignItems.tabport ? media.tabport(setFlex({ y: alignItems.tabport })) : null}
   ${({ alignItems }) =>
      alignItems && alignItems.phone ? media.phone(setFlex({ y: alignItems.phone })) : null}
    // flex-basis
   ${({ flexWidth }) =>
      flexWidth && typeof flexWidth === 'string' ? setFlexWidth({ width: flexWidth }) : null}
   ${({ flexWidth }) =>
      flexWidth && flexWidth.desktop ? setFlexWidth({ width: flexWidth.desktop }) : null}
   ${({ flexWidth }) =>
      flexWidth && flexWidth.tabland
         ? media.tabland(setFlexWidth({ width: flexWidth.tabland }))
         : null}
   ${({ flexWidth }) =>
      flexWidth && flexWidth.tabport
         ? media.tabport(setFlexWidth({ width: flexWidth.tabport }))
         : null}
   ${({ flexWidth }) =>
      flexWidth && flexWidth.phone ? media.phone(setFlexWidth({ width: flexWidth.phone })) : null}
  ${(props) =>
      props.mg
         ? setMargin({
              x: props.mg.x,
              y: props.mg.y
           })
         : ''}
  color: ${colorGrey.dark1};
   text-transform: capitalize;
   text-decoration: none;
   &:hover {
      color: ${colorGrey.dark1};
   }
   ${applyStyleModifiers(LINK_MODIFIERS)}
`;
