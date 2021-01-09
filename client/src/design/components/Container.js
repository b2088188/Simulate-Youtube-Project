import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { setFlex, setFlexWidth, setMargin } from "../utils";

const CONTAINER_MODIFIERS = {
  small: () => `
    
  `,
};

export const Container = styled.div`
  min-height: 90vh;
  ${applyStyleModifiers(CONTAINER_MODIFIERS)}
`;

export const FormContainer = styled.div`
  width: 50%;
  margin: 2rem auto;
  ${setFlex({ direction: "column", x: "center" })}
`;

export const Row = styled.div`
  ${setFlex({ wrap: "wrap" })}
  width: 100%;
  min-height: inherit;
`;

export const Col = styled.div`
  //Margin
  ${(props) => (props.mg ? setMargin({ x: props.mg.x, y: props.mg.y }) : null)}
  //Width
	${(props) => props.col_12 && setFlexWidth({ width: "100" })}
	${(props) => props.col_10 && setFlexWidth({ width: "83" })}
	${(props) => props.col_9 && setFlexWidth({ width: "75" })}
	${(props) => props.col_6 && setFlexWidth()}
	${(props) => props.col_4 && setFlexWidth({ width: "33.2" })}
	${(props) => props.col_3 && setFlexWidth({ width: "25" })}
	${(props) => props.col_2 && setFlexWidth({ width: "16.6" })}
`;

export const ImageContainer = styled.div`
  ${(props) => (props.width ? `width: ${props.width}` : null)}
  ${(props) =>
    props.flexWidth ? setFlexWidth({ width: props.flexWidth }) : null}
`;
