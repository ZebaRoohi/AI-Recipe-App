import { TextFieldProps } from '@mui/material';

export type CustomTextFieldProps = TextFieldProps & {
  // Add app-specific props here if needed
  name?: string;
};
