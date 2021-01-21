import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { setFlex, setFlexWidth, setMargin, setSize, media } from '../utils';

const CONTAINER_MODIFIERS = {
   small: () => `
    
  `
};

export const Container = styled.div`
   min-height: 90vh;
   ${applyStyleModifiers(CONTAINER_MODIFIERS)}
`;

export const FormContainer = styled.div`
   margin: 0 auto;
   // margin vertical
   ${({ my }) => (my && typeof my === 'string' ? `margin: ${my}rem auto;` : null)}
   ${({ my }) => (my && my.desktop ? `margin: ${my.desktop}rem auto;` : null)}
   ${({ my }) => (my && my.tabland ? media.tabland(`margin: ${my.tabland}rem auto;`) : null)}
   ${({ my }) => (my && my.tabport ? media.tabport(`margin: ${my.tabport}rem auto;`) : null)}
   ${({ my }) => (my && my.phone ? media.phone(`margin: ${my.phone}rem auto;`) : null)}
   // width
   ${({ width }) => (width && typeof width === 'string' ? `width: ${width};` : null)}
   ${({ width }) => (width && width.desktop ? `width: ${width.desktop};` : null)}
   ${({ width }) => (width && width.tabland ? media.tabland(`width: ${width.tabland};`) : null)}
   ${({ width }) => (width && width.tabport ? media.tabport(`width: ${width.tabport};`) : null)}
   ${({ width }) => (width && width.phone ? media.phone(`width: ${width.phone};`) : null)}
   ${setFlex({ direction: 'column', x: 'center' })}
`;

export const Row = styled.div`
   ${setFlex({ wrap: 'wrap' })}
   ${({ flexDirection }) =>
      flexDirection && flexDirection.desktop ? setFlex({ direction: flexDirection.desktop }) : null}
   ${({ flexDirection }) =>
      flexDirection && flexDirection.tabland
         ? media.tabland(setFlex({ direction: flexDirection.tabland }))
         : null}
   ${({ flexDirection }) =>
      flexDirection && flexDirection.tabport
         ? media.tabport(setFlex({ direction: flexDirection.tabport }))
         : null}
   ${({ flexDirection }) =>
      flexDirection && flexDirection.phone
         ? media.phone(setFlex({ direction: flexDirection.phone }))
         : null}
   width: 100%;
   min-height: inherit;
`;

export const Col = styled.div`
   //Margin
   ${(props) => (props.mg ? setMargin({ x: props.mg.x, y: props.mg.y }) : null)}
   //Width
   ${({ width }) =>
      width && typeof width === 'string' ? setFlexWidth({ width: 8.33 * width }) : null}
   ${({ width }) => (width && width.desktop ? setFlexWidth({ width: 8.33 * width.desktop }) : null)}
   ${({ width }) =>
      width && width.tabland ? media.tabland(setFlexWidth({ width: 8.33 * width.tabland })) : null}
   ${({ width }) =>
      width && width.tabport ? media.tabport(setFlexWidth({ width: 8.33 * width.tabport })) : null}
   ${({ width }) =>
      width && width.phone ? media.phone(setFlexWidth({ width: 8.33 * width.phone })) : null}

  ${(props) => props.col_12 && setFlexWidth({ width: '100' })}
  ${(props) => props.col_10 && setFlexWidth({ width: '83' })}
  ${(props) => props.col_9 && setFlexWidth({ width: '75' })}
  ${(props) => props.col_6 && setFlexWidth()}
  ${(props) => props.col_4 && setFlexWidth({ width: '33.2' })}
  ${(props) => props.col_3 && setFlexWidth({ width: '25' })}
  ${(props) => props.col_2 && setFlexWidth({ width: '16.6' })}
`;

export const ImageContainer = styled.div`
   min-height: 3rem;
   min-width: 3rem;
   //Width
   ${({ width }) => (width && typeof width === 'string' ? `width: ${width};` : null)}
   ${({ width }) => (width && width.desktop ? `width: ${width.desktop};` : null)}
   ${({ width }) => (width && width.tabland ? media.tabland(`width: ${width.tabland};`) : null)}
   ${({ width }) => (width && width.tabport ? media.tabport(`width: ${width.tabport};`) : null)}
   ${({ width }) => (width && width.phone ? media.phone(`width: ${width.phone};`) : null)}
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
   //Margin
   ${({ mr }) => (mr && typeof mr === 'string' ? `margin-right: ${mr};` : null)}
   ${({ mr }) => (mr && mr.desktop ? `margin-right: ${mr.desktop};` : null)}
   ${({ mr }) => (mr && mr.tabland ? media.tabland(`margin-right: ${mr.tabland};`) : null)}
   ${({ mr }) => (mr && mr.tabport ? media.tabport(`margin-right: ${mr.tabport};`) : null)}
   ${({ mr }) => (mr && mr.phone ? media.phone(`margin-right: ${mr.phone};`) : null)}
   ${(props) =>
      props.size ? setSize({ width: props.size.width, height: props.size.height }) : null}
`;

export const CenterWrapper = styled.div`
   margin: 0 auto;
   //margin vertical
   ${({ my }) => (my && typeof my === 'string' ? `margin: ${my}rem auto;` : null)}
   ${({ my }) => (my && my.desktop ? `margin: ${my.desktop}rem auto;` : null)}
   ${({ my }) => (my && my.tabland ? media.tabland(`margin: ${my.tabland}rem auto;`) : null)}
   ${({ my }) => (my && my.tabport ? media.tabport(`margin: ${my.tabport}rem auto;`) : null)}
   ${({ my }) => (my && my.phone ? media.phone(`margin: ${my.phone}rem auto;`) : null)}
   //Width
   ${({ width }) => (width && typeof width === 'string' ? `width: ${width}%;` : null)}
   ${({ width }) => (width && width.desktop ? `width: ${width.desktop}%;` : null)}
   ${({ width }) => (width && width.tabland ? media.tabland(`width: ${width.tabland}%;`) : null)}
   ${({ width }) => (width && width.tabport ? media.tabport(`width: ${width.tabport}%;`) : null)}
   ${({ width }) => (width && width.phone ? media.phone(`width: ${width.phone}%;`) : null)}
`;

export const FlexWrapper = styled.div`
   display: flex;
   // flex-direction
   ${({ direction }) =>
      direction && typeof direction === 'string' ? `flex-direction: ${direction};` : null}
   ${({ direction }) =>
      direction && direction.desktop ? `flex-direction: ${direction.desktop};` : null}
   ${({ direction }) =>
      direction && direction.tabland
         ? media.tabland(`flex-direction: ${direction.tabland};`)
         : null}
   ${({ direction }) =>
      direction && direction.tabport
         ? media.tabport(`flex-direction: ${direction.tabport};`)
         : null}
   ${({ direction }) =>
      direction && direction.phone ? media.phone(`flex-direction: ${direction.phone};`) : null}
         // align-items
         ${({ y }) => (y && typeof y === 'string' ? `align-items: ${y};` : null)}
   ${({ y }) => (y && y.desktop ? `align-items: ${y};` : null)}
   ${({ y }) => (y && y.tabland ? media.tabland(`align-items: ${y.tabland};`) : null)}
   ${({ y }) => (y && y.tabport ? media.tabport(`align-items: ${y.tabport};`) : null)}
   ${({ y }) => (y && y.phone ? media.phone(`align-items: ${y.phone};`) : null)}
`;
