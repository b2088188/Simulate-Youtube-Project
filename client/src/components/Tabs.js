import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { AppBar, Tabs as MTabs, Tab } from '@material-ui/core';

function Tabs({ children }) {
   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <AppBar
         position='static'
         color='default'
         css={`
            box-shadow: none;
            .MuiTab-root {
               text-transform: capitalize;
            }
         `}
      >
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

export { Tabs, Tab };
