import styled from "styled-components";
import { colorGrey, colorNormal, setBorder, setFlowToRight } from "../utils";
import { applyStyleModifiers } from "styled-components-modifiers";

const LIST_MODIFIERS = {};
export const List = styled.ul`
  font-size: 1.4rem;
  list-style: none;
  ${applyStyleModifiers(LIST_MODIFIERS)}
`;

const LISTITEM_MODIFIERS = {};
const ListItem = styled.li`
  position: relative;
  ${(props) =>
    props.flow ? setFlowToRight({ color: props.flow.color }) : null}
  ${applyStyleModifiers(LISTITEM_MODIFIERS)}
`;
List.Item = ListItem;
