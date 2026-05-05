import React from 'react';
import TextField from '@mui/material/TextField';
import { CustomTextFieldProps } from '../interfaces/ui/CustomTextField';

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  fullWidth = true,
  variant = 'outlined',
  ...rest
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      {...rest}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#FFF9C4',
          borderRadius: '8px',

          // input text color
          '& .MuiInputBase-input': {
            color: '#2e7d32'
          },

          // border colors
          '& fieldset': {
            borderColor: '#2e7d32'
          },
          '&:hover fieldset': {
            borderColor: '#1b5e20'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1b5e20'
          }
        },

        // label color
        '& .MuiInputLabel-root': {
          color: '#2e7d32'
        },

        // label when focused
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#1b5e20'
        }
      }}
    />
  );
};

export default CustomTextField;