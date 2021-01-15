import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { Title } from '../components/Title';
import { Paragraph } from '../components/Paragraph';
import { Span } from '../components/Span';
import { Button } from '../components/Button';
import { setFlex, setBorder, setFlexWidth, setMargin, setPadding, media } from '../utils';

const LISTGROUP_MODIFIERS = {
   horizontal: () => `
        display: flex;
        flex-direction: row;
    `,
   vertical: () => `
        display: flex;
        flex-direction: column;
    `
};

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
    ${({ flexWrap }) => (flexWrap ? `flex-wrap: wrap` : null)}
    ${applyStyleModifiers(LISTGROUP_MODIFIERS)}
`;

const ITEM_MODIFIERS = {};

const ListGroupItem = styled.div`
   // Width
   ${(props) => props.full && setFlexWidth({ width: '100' })}
   ${(props) => props.p80 && setFlexWidth({ width: '80' })}
    ${(props) => props.p75 && setFlexWidth({ width: '75' })}
    ${(props) => props.p70 && setFlexWidth({ width: '70' })}
    ${(props) => props.p60 && setFlexWidth({ width: '60' })}
  ${(props) => props.half && setFlexWidth({ width: '50' })}
    ${(props) => props.p40 && setFlexWidth({ width: '40' })}
    ${(props) => props.p35 && setFlexWidth({ width: '35' })}
    ${(props) => props.p30 && setFlexWidth({ width: '30' })}
    ${(props) => props.p25 && setFlexWidth({ width: '25' })}
    ${(props) => props.p20 && setFlexWidth({ width: '20' })}
  ${(props) => props.p15 && setFlexWidth({ width: '15' })}
    ${(props) => props.p10 && setFlexWidth({ width: '10' })}
    ${(props) => props.p5 && setFlexWidth({ width: '5' })}
    // flex & align-items
    ${({ flexy }) => (flexy && typeof flexy === 'string' ? setFlex({ y: flexy }) : null)}
   ${({ flexy }) => (flexy && flexy.desktop ? setFlex({ y: flexy.desktop }) : null)}
   ${({ flexy }) => (flexy && flexy.tabland ? media.tabland(setFlex({ y: flexy.tabland })) : null)}
   ${({ flexy }) => (flexy && flexy.tabport ? media.tabport(setFlex({ y: flexy.tabport })) : null)}
   ${({ flexy }) => (flexy && flexy.phone ? media.phone(setFlex({ y: flexy.phone })) : null)}
  
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
      flexwidth && flexwidth.phone
         ? media.phone(setFlexWidth({ width: flexwidth.phone }))
         : null}   
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
