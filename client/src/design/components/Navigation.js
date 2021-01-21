import styled from 'styled-components';
import { setFlexWidth, media } from '../utils';

export const Navigation = styled.nav`
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
`;
