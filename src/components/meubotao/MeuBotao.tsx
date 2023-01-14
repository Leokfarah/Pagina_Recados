import * as React from 'react';
import Button from '@mui/material/Button';

interface MeuBotaoProps {
    texto: string,
    color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    size: 'large' | 'medium' | 'small',
    variant: 'contained' | 'outlined' | 'text',
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    sx?: object,
}

export const MeuBotao = ({ texto, color, size, variant, onClick }: MeuBotaoProps) => {
    return (
        <Button variant={variant} color={color} size={size} onClick={onClick} sx={{ m: 1 }}>{texto}</Button>
    );
}