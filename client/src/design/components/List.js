import styled from 'styled-components';
import {
   colorGrey,
   colorNormal,
   setBorder,
   setFlowToRight,
   setMargin,
   setFlex,
   setFlexWidth,
   setPadding,
   media
} from '../utils';
import { applyStyleModifiers } from 'styled-components-modifiers';

const LIST_MODIFIERS = {};
export const List = styled.ul`
   font-size: 1.4rem;
   list-style: none;
   // flex & flex-direction
   ${({ flexDirection }) =>
      flexDirection && typeof flexDirection === 'string'
         ? setFlex({ direction: flexDirection })
         : null}
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
   // flex & justify-content & align-items
    ${({ flexxy }) =>
      flexxy && typeof flexxy === 'object' ? setFlex({ x: flexxy.x, y: flexxy.y }) : null}
   ${({ flexxy }) =>
      flexxy && flexxy.desktop ? setFlex({ x: flexxy.desktop.x, y: flexxy.desktop.y }) : null}
   ${({ flexxy }) =>
      flexxy && flexxy.tabland
         ? media.tabland(setFlex({ x: flexxy.tabland.x, y: flexxy.tabland.y }))
         : null}
   ${({ flexxy }) =>
      flexxy && flexxy.tabport
         ? media.tabport(setFlex({ x: flexxy.tabport.x, y: flexxy.tabport.y }))
         : null}
   ${({ flexxy }) =>
      flexxy && flexxy.phone
         ? media.phone(setFlex({ x: flexxy.phone.x, y: flexxy.phone.y }))
         : null}
   // flex & align-items
    ${({ flexY }) => (flexY && typeof flexY === 'string' ? setFlex({ y: flexY }) : null)}
   ${({ flexY }) => (flexY && flexY.desktop ? setFlex({ y: flexY.desktop }) : null)}
   ${({ flexY }) => (flexY && flexY.tabland ? media.tabland(setFlex({ y: flexY.tabland })) : null)}
   ${({ flexY }) => (flexY && flexY.tabport ? media.tabport(setFlex({ y: flexY.tabport })) : null)}
   ${({ flexY }) => (flexY && flexY.phone ? media.phone(setFlex({ y: flexY.phone })) : null)}
   // flex & flex-basis
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
   // margin vertical
   ${({ my }) => (my && my.desktop ? setMargin({ x: '0', y: my.desktop }) : null)}
   ${({ my }) => (my && my.tabland ? media.tabland(setMargin({ x: '0', y: my.tabland })) : null)}
   ${({ my }) => (my && my.tabport ? media.tabport(setMargin({ x: '0', y: my.tabport })) : null)}
   ${({ my }) => (my && my.phone ? media.phone(setMargin({ x: '0', y: my.phone })) : null)}
  ${applyStyleModifiers(LIST_MODIFIERS)}
`;

const LISTITEM_MODIFIERS = {};
const ListItem = styled.li`
   position: relative;
   ${({ pd }) => (pd && typeof pd === 'object' ? setPadding({ x: pd.x, y: pd.y }) : null)}
   ${({ pd }) => (pd && pd[0] ? setPadding({ x: pd[0].x, y: pd[0].y }) : null)}
   ${({ pd }) => (pd && pd[1] ? media.tabland(setPadding({ x: pd[1].x, y: pd[1].y })) : null)}
   ${({ pd }) => (pd && pd[2] ? media.tabport(setPadding({ x: pd[2].x, y: pd[2].y })) : null)}
   ${({ pd }) => (pd && pd[3] ? media.phone(setPadding({ x: pd[3].x, y: pd[3].y })) : null)}
  ${(props) => (props.flow ? setFlowToRight({ color: props.flow.color }) : null)}
  ${applyStyleModifiers(LISTITEM_MODIFIERS)}
`;
List.Item = ListItem;
