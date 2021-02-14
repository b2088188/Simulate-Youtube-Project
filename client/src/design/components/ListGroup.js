import styled from 'styled-components/macro';
import { setFlex, setBorder, setFlexWidth, setMargin, setPadding, media } from 'design/utils';

export const ListGroup = styled.div`
   padding: 0.75rem 1.25rem;
   // flex & align-items
   ${({ flexy }) => (flexy && typeof flexy === 'string' ? setFlex({ y: flexy }) : null)}
   ${({ flexy }) => (flexy && flexy.desktop ? setFlex({ y: flexy.desktop }) : null)}
   ${({ flexy }) => (flexy && flexy.tabland ? media.tabland(setFlex({ y: flexy.tabland })) : null)}
   ${({ flexy }) => (flexy && flexy.tabport ? media.tabport(setFlex({ y: flexy.tabport })) : null)}
   ${({ flexy }) => (flexy && flexy.phone ? media.phone(setFlex({ y: flexy.phone })) : null)}
 
   //Position
   ${(props) => props.xcenter && setFlex({ x: 'center' })}
   ${(props) => props.ycenter && setFlex({ y: 'center' })}
  ${(props) => props.center && setFlex({ x: 'center', y: 'center' })}
    ${(props) => props.ystart && setFlex({ y: 'flex-start' })}
  ${(props) => props.bdbottom && setBorder({ position: 'border-bottom' })}
    ${(props) => props.bdtop && setBorder({ position: 'border-top' })}
    ${(props) => props.pd && setPadding({ x: props.pd.x, y: props.pd.y })}
    ${({ wrap }) => (wrap ? `flex-wrap: wrap` : null)}
`;

const ListGroupItem = styled.div`
   // flex & align-items
   ${({ flexy }) => (flexy && typeof flexy === 'string' ? setFlex({ y: flexy }) : null)}
   ${({ flexy }) => (flexy && flexy.desktop ? setFlex({ y: flexy.desktop }) : null)}
   ${({ flexy }) => (flexy && flexy.tabland ? media.tabland(setFlex({ y: flexy.tabland })) : null)}
   ${({ flexy }) => (flexy && flexy.tabport ? media.tabport(setFlex({ y: flexy.tabport })) : null)}
   ${({ flexy }) => (flexy && flexy.phone ? media.phone(setFlex({ y: flexy.phone })) : null)}
  
   // flex-basis
   ${({ width }) => (width && typeof width === 'string' ? setFlexWidth({ width }) : null)}
   ${({ width }) => (width && width.desktop ? setFlexWidth({ width: width.desktop }) : null)}
   ${({ width }) =>
      width && width.tabland ? media.tabland(setFlexWidth({ width: width.tabland })) : null}
   ${({ width }) =>
      width && width.tabport ? media.tabport(setFlexWidth({ width: width.tabport })) : null}
   ${({ width }) =>
      width && width.phone ? media.phone(setFlexWidth({ width: width.phone })) : null}   
    //Margin
    ${(props) => (props.mg ? setMargin({ x: props.mg.x, y: props.mg.y }) : null)}
    // margin horizontal
    ${({ spacing }) =>
      spacing && typeof spacing === 'string' ? setMargin({ x: `${spacing}%`, y: 0 }) : null}
 ${({ spacing }) =>
      spacing && spacing.desktop ? setMargin({ x: `${spacing.desktop}%`, y: 0 }) : null}
   ${({ spacing }) =>
      spacing && spacing.tabland
         ? media.tabland(setMargin({ x: `${spacing.tabland}%`, y: 0 }))
         : null}
   ${({ spacing }) =>
      spacing && spacing.tabport
         ? media.tabport(setMargin({ x: `${spacing.tabport}%`, y: 0 }))
         : null}
   ${({ spacing }) =>
      spacing && spacing.phone ? media.phone(setMargin({ x: `${spacing.phone}%`, y: 0 })) : null}
    // margin vertical
    ${({ mx }) => (mx && typeof mx === 'string' ? setMargin({ x: mx, y: 0 }) : null)}
 ${({ mx }) => (mx && mx.desktop ? setMargin({ x: mx.desktop, y: 0 }) : null)}
   ${({ mx }) => (mx && mx.tabland ? media.tabland(setMargin({ x: mx.tabland, y: 0 })) : null)}
   ${({ mx }) => (mx && mx.tabport ? media.tabport(setMargin({ x: mx.tabport, y: 0 })) : null)}
   ${({ mx }) => (mx && mx.phone ? media.phone(setMargin({ x: mx.phone, y: 0 })) : null)}
    // margin-bottom
   ${({ mb }) => (mb && typeof mb === 'string' ? `margin-bottom: ${mb};` : null)}
   ${({ mb }) => (mb && mb.desktop ? `margin-bottom: ${mb.desktop};` : null)}
   ${({ mb }) => (mb && mb.tabland ? media.tabland(`margin-bottom: ${mb.tabland};`) : null)}
   ${({ mb }) => (mb && mb.tabport ? media.tabport(`margin-bottom: ${mb.tabport};`) : null)}
   ${({ mb }) => (mb && mb.phone ? media.phone(`margin-bottom: ${mb.phone};`) : null)}
    //Border
    ${(props) => (props.bd ? setBorder() : null)}
    ${(props) => (props.bdtop ? setBorder({ position: 'border-top' }) : null)}
`;
ListGroup.Item = ListGroupItem;
