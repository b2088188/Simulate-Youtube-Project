import React from 'react';
import styled from 'styled-components';
import { AppBar, Tabs, Typography, Box } from '@material-ui/core';

function ScrollerTab({ children, className }) {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <AppBar position='static' color='default' className={className}>
         <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
         >
            {children}
         </Tabs>
      </AppBar>
   );
}

export default styled(ScrollerTab)`
   box-shadow: none;
   .MuiTab-root {
      text-transform: capitalize;
   }
`;
