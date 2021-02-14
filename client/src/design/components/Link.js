import styled from 'styled-components/macro';
import { colorGrey, setPadding, setMargin, setFlex, setFlexWidth, media } from 'design/utils';
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
${({ pdxy }) => (pdxy && typeof pdxy === 'object' ? setPadding({ x: pdxy.x, y: pdxy.y }) : null)}
 ${({ pdxy }) =>
      pdxy && pdxy.desktop ? setPadding({ x: pdxy.desktop.x, y: pdxy.desktop.y }) : null}
   ${({ pdxy }) =>
      pdxy && pdxy.tabland
         ? media.tabland(setPadding({ x: pdxy.tabland.x, y: pdxy.tabland.y }))
         : null}
   ${({ pdxy }) =>
      pdxy && pdxy.tabport
         ? media.tabport(setPadding({ x: pdxy.tabport.x, y: pdxy.tabport.y }))
         : null}
   ${({ pdxy }) =>
      pdxy && pdxy.phone ? media.phone(setPadding({ x: pdxy.phone.x, y: pdxy.phone.y })) : null}
   // margin-right
   ${({ mr }) => (mr && typeof mr === 'string' ? `margin-right: ${mr};` : null)}
   ${({ mr }) => (mr && mr.desktop ? `margin-right: ${mr.desktop};` : null)}
   ${({ mr }) => (mr && mr.tabland ? media.tabland(`margin-right: ${mr.tabland};`) : null)}
   ${({ mr }) => (mr && mr.tabport ? media.tabport(`margin-right: ${mr.tabport};`) : null)}
   ${({ mr }) => (mr && mr.phone ? media.phone(`margin-right: ${mr.phone};`) : null)}
   // Flex & align-items
   ${({ flexy }) => (flexy && typeof flexy === 'string' ? setFlex({ y: flexy }) : null)}
   ${({ flexy }) => (flexy && flexy.desktop ? setFlex({ y: flexy.desktop }) : null)}
   ${({ flexy }) => (flexy && flexy.tabland ? media.tabland(setFlex({ y: flexy.tabland })) : null)}
   ${({ flexy }) => (flexy && flexy.tabport ? media.tabport(setFlex({ y: flexy.tabport })) : null)}
   ${({ flexy }) => (flexy && flexy.phone ? media.phone(setFlex({ y: flexy.phone })) : null)}

   ${({ flexY }) => (flexY && typeof flexY === 'string' ? setFlex({ y: flexY }) : null)}
   ${({ flexY }) => (flexY && flexY.desktop ? setFlex({ y: flexY.desktop }) : null)}
   ${({ flexY }) => (flexY && flexY.tabland ? media.tabland(setFlex({ y: flexY.tabland })) : null)}
   ${({ flexY }) => (flexY && flexY.tabport ? media.tabport(setFlex({ y: flexY.tabport })) : null)}
   ${({ flexY }) => (flexY && flexY.phone ? media.phone(setFlex({ y: flexY.phone })) : null)}
    // flex-basis
    ${({ flexwidth }) =>
      flexwidth && typeof flexwidth === 'string' ? setFlexWidth({ width: flexwidth }) : null}
   ${({ flexwidth }) =>
      flexwidth && flexwidth.desktop ? setFlexWidth({ width: flexwidth.desktop }) : null}
   ${({ flexwidth }) =>
      flexwidth && flexwidth.tabland
         ? media.tabland(setFlexWidth({ width: flexwidth.tabland }))
         : null}
   ${({ flexwidth }) =>
      flexwidth && flexwidth.tabport
         ? media.tabport(setFlexWidth({ width: flexwidth.tabport }))
         : null}
   ${({ flexwidth }) =>
      flexwidth && flexwidth.phone ? media.phone(setFlexWidth({ width: flexwidth.phone })) : null}

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
