import React, { useState } from 'react';
import styled from 'styled-components';
import { AppBar, Tabs as MTabs, Tab } from '@material-ui/core';

function Tabs({ children, className }) {
   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <AppBar position='static' color='default' className={className}>
         <MTabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
         >
            {children}
         </MTabs>
      </AppBar>
   );
}

styled(Tabs)`
   box-shadow: none;
   .MuiTab-root {
      text-transform: capitalize;
   }
`;

export { Tabs, Tab };
