import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { colorGrey, colorNormal, setBorder, setMargin, setFlex, setFlexWidth, setPadding, media } from "../utils";


export const Navigation = styled.nav`
     // flex-basis
   ${({flexWidth}) => flexWidth && typeof flexWidth === 'string' ? setFlexWidth({width: flexWidth}) : null}
   ${({flexWidth}) => flexWidth && flexWidth.desktop ? setFlexWidth({width: flexWidth.desktop}) : null}
   ${({flexWidth}) => flexWidth &&flexWidth.tabland ? media.tabland(setFlexWidth({width: flexWidth.tabland}))  : null}
   ${({flexWidth}) => flexWidth &&flexWidth.tabport ? media.tabport(setFlexWidth({width: flexWidth.tabport})) : null}
   ${({flexWidth}) => flexWidth &&flexWidth.phone ? media.phone(setFlexWidth({width: flexWidth.phone})) : null}
`;


