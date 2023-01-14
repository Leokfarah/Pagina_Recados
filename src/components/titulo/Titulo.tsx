import React from 'react';
import { Typography } from "@mui/material";

interface tituloProps {
    variant: 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2'
    align: 'center' | 'inherit' | 'justify' | 'left' | 'right',
    texto: string,
}

export const MeuTitulo = ({ variant, align, texto }: tituloProps) => {
    return (
        <Typography variant={variant} align={align}>
            {texto}
        </Typography>
    );
}