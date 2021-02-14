import { NativeSelect, FormHelperText } from '@material-ui/core';

const Select = ({ children, value, setValue, label }) => {
   return (
      <>
         <NativeSelect
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name='category'
            inputProps={{ 'aria-label': 'age' }}
         >
            {children}
         </NativeSelect>
         <FormHelperText>{label}</FormHelperText>
      </>
   );
};

export { Select };
