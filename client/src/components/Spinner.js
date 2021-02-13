import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';
import { colorGrey, setFlex } from 'design/utils';

const Spinner = () => {
   return (
      <CircularProgress
         css={`
            color: ${colorGrey.dark2};
         `}
      />
   );
};

const FullPageSpinner = () => {
   return (
      <div
         css={`
            height: 100vh;
            ${setFlex({ direction: 'column', x: 'center', y: 'center' })}
         `}
      >
         <CircularProgress
            css={`
               color: ${colorGrey.dark2};
            `}
         />
      </div>
   );
};

const AreaSpinner = () => {
   return (
      <div
         css={`
            height: inherit;
            min-width: 100%;
            ${setFlex({ direction: 'column', x: 'center', y: 'center' })}
         `}
      >
         <CircularProgress
            css={`
               color: ${colorGrey.dark2};
            `}
         />
      </div>
   );
};

export { Spinner, FullPageSpinner, AreaSpinner };
