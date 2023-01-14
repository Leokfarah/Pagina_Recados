import React from 'react';
import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

export const Theme = createTheme(
    {
        palette: {
            primary: {
                main: '#202328'
            },

            secondary: {
                main: '#522e92'
            },

            error: {
                main: '#b00020'
            },

            warning: {
                main: '#fafafa'
            },

            info: {
                main: '#607d8b'
            },

            success: {
                main: '#00897b'
            },
        },
    },
    ptBR
);