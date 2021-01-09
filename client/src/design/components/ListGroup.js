import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { Title } from "../components/Title";
import { Paragraph } from "../components/Paragraph";
import { Span } from "../components/Span";
import { Button } from "../components/Button";
import { setFlex, setBorder, setFlexWidth, setMargin } from "../utils";

const LISTGROUP_MODIFIERS = {
  horizontal: () => `
        display: flex;
        flex-direction: row;
    `,
  vertical: () => `
        display: flex;
        flex-direction: column;
    `,
};

export const ListGroup = styled.div`
  padding: 0.75rem 1.25rem;
  //Position
  ${(props) => props.xcenter && setFlex({ x: "center" })}
  ${(props) => props.ycenter && setFlex({ y: "center" })}
	${(props) => props.center && setFlex({ x: "center", y: "center" })}
    ${(props) => props.ystart && setFlex({ y: "flex-start" })}
	${(props) => props.bdbottom && setBorder({ position: "border-bottom" })}
    ${(props) => props.bdtop && setBorder({ position: "border-top" })}
    ${applyStyleModifiers(LISTGROUP_MODIFIERS)}
`;

const ITEM_MODIFIERS = {};

const ListGroupItem = styled.div`
  // Width
  ${(props) => props.full && setFlexWidth({ width: "100" })}
  ${(props) => props.p80 && setFlexWidth({ width: "80" })}
    ${(props) => props.p75 && setFlexWidth({ width: "75" })}
    ${(props) => props.p70 && setFlexWidth({ width: "70" })}
    ${(props) => props.p60 && setFlexWidth({ width: "60" })}
	${(props) => props.half && setFlexWidth({ width: "50" })}
    ${(props) => props.p40 && setFlexWidth({ width: "40" })}
    ${(props) => props.p35 && setFlexWidth({ width: "35" })}
    ${(props) => props.p30 && setFlexWidth({ width: "30" })}
    ${(props) => props.p25 && setFlexWidth({ width: "25" })}
    ${(props) => props.p20 && setFlexWidth({ width: "20" })}
	${(props) => props.p15 && setFlexWidth({ width: "15" })}
    ${(props) => props.p10 && setFlexWidth({ width: "10" })}
    ${(props) => props.p5 && setFlexWidth({ width: "5" })}
    //Margin
    ${(props) =>
    props.mg ? setMargin({ x: props.mg.x, y: props.mg.y }) : null}
    //Border
    ${(props) => (props.bd ? setBorder() : null)}
    ${(props) => (props.bdtop ? setBorder({ position: "border-top" }) : null)}
`;
ListGroup.Item = ListGroupItem;
