import * as React from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import storage from 'redux-persist/lib/storage';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { getRecadosArquivadosNomesThunk } from '../../store/modules/recadosSlice/RecadosSlice';
import { IResposta } from '../../interfaces/iResposta/iResposta';

export const HeaderArquivados = () => {
    const [buscarArquivados, setBuscarArquivados] = React.useState('');
    const loginData: IResposta = useAppSelector((state) => state.usuarios);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEnhancedEffect(() => {
        const idUsuario = loginData.dados;

        const dadosBusca = {
            idUsuario: idUsuario,
            titulo: buscarArquivados
        }

        dispatch(getRecadosArquivadosNomesThunk(dadosBusca));

    }, [buscarArquivados])

    function deslogar() {
        storage.setItem('persist:UsuarioLogado', '{usuarios: "{}", recados: "{"ids":[],"entities":{}}", _persist: "{"version":-1,"rehydrated":true}"}');
        window.location.reload();
    };

    function recados() {
        return navigate('/recados');
    };

    return (
        <Box sx={{ flexGrow: 1, boxShadow: '0 0 20px 1px white' }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems={'center'}>
                        <Grid item xs={12} md={5} display='flex' alignItems='center'>

                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 0.5, ml: 4.2 }}>
                                Recados Arquivados
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={5} display='flex' alignItems='center'>
                            <TextField type='text' label='&#128269;Pesquisar arquivados por Título'
                                placeholder='Título' value={buscarArquivados} color='warning'
                                size='small' variant='outlined'
                                sx={{
                                    flexGrow: 1, bgcolor: '#fafafa50',
                                    borderRadius: '5px', mr: { xs: 0, md: 3 }
                                }}
                                onChange={((e) => setBuscarArquivados(e.target.value))}
                            />
                        </Grid>

                        <Grid item xs={12} md={2} display='flex'
                            alignItems='center' justifyContent='space-between'>
                            <Button sx={{ m: 1 }} variant='outlined'
                                color="inherit" onClick={recados}>Meus Recados</Button>
                            <Button sx={{ m: 1 }} color="info" onClick={deslogar}>Logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};