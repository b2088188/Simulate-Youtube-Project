import React from 'react';
import { MenuList, Grow, Paper, Popper, ClickAwayListener } from '@material-ui/core';

const Menu = ({ open, setOpen, anchorRef, children, className }) => {
   const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) return;
      setOpen(false);
   };

   return (
      <Popper open={open} anchorEl={anchorRef?.current || null} transition>
         {({ TransitionProps, placement }) => (
            <Grow
               {...TransitionProps}
               style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
               }}
            >
               <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                     <MenuList autoFocusItem={open}>{children}</MenuList>
                  </ClickAwayListener>
               </Paper>
            </Grow>
         )}
      </Popper>
   );
};

export default Menu;
