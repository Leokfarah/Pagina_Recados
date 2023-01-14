import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export interface AlertProps {
  titulo: string,
  mensagem: string,
  severity: 'error' | 'info' | 'success' | 'warning',
  // position?: 'fixed' | 'relative' | 'absolute' | 'sticky' | 'static'
};

export const MeuAlert = ({ titulo, mensagem, severity }: AlertProps) => {
  return (
    <Alert severity={severity} sx={{ position: 'absolute', width: 1 }}>
      <AlertTitle sx={{ fontWeight: 'bold' }}>{titulo}</AlertTitle>
      {mensagem}
    </Alert>
  );
}