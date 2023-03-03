import * as React from 'react';
import {
    Box, AppBar, Toolbar, Button, IconButton, Typography,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { MeuAlert } from '../meuAlert/MeuAlert';
import { IRecados } from '../../interfaces/iRecados/iRecados';
import { criarNovoRecadoThunk, getRecadosNomesThunk } from '../../store/modules/recadosSlice/RecadosSlice';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import storage from 'redux-persist/lib/storage';
import { IResposta } from '../../interfaces/iResposta/iResposta';

export const HeaderRecados = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [data, setData] = React.useState('');
    const [alerta, setAlerta] = React.useState(false);
    const [buscar, setBuscar] = React.useState('');
    const loginData: IResposta = useAppSelector((state) => state.usuarios);
    const dispatch = useAppDispatch();

    React.useLayoutEffect(() => {
        const idUsuario = loginData.dados;

        const dadosBusca = {
            idUsuario: idUsuario,
            titulo: buscar
        }

        dispatch(getRecadosNomesThunk(dadosBusca));

    }, [buscar])

    const addRecado = () => {
        const userLogado = loginData.dados;

        if (userLogado) {
            if (!descricao || !titulo || !data) {
                meuAlerta();
                return;
            }

            const novoRecado: IRecados = {
                idUsuario: userLogado,
                titulo: titulo,
                descricao: descricao,
                data: data,
            }

            dispatch(criarNovoRecadoThunk(novoRecado));
            limparEstados();
            handleClose();
        }
    };

    const limparEstados = () => {
        setTitulo('');
        setDescricao('');
        setData('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const meuAlerta = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false);
        }, 4000);
    }

    function deslogar() {
        storage.setItem('persist:UsuarioLogado', '{usuarios: "{}", recados: "{"ids":[],"entities":{}}", _persist: "{"version":-1,"rehydrated":true}"}');
        window.location.reload();
    };

    function arquivados() {
        return navigate('/arquivados');
    };

    return (
        <Box sx={{ flexGrow: 1, boxShadow: '0 0 20px 1px white' }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems={'center'}>
                        <Grid item xs={12} md={5} display='flex' alignItems='center'>
                            <IconButton
                                size="large" edge="start"
                                color="warning" aria-label="NoteAddOutlinedIcon"
                                onClick={handleClickOpen}>
                                <NoteAddOutlinedIcon />
                            </IconButton>

                            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                                Adicionar novo recado
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={5} display='flex' alignItems='center'>
                            <TextField type='text' label='&#128269;Pesquisar por Título'
                                placeholder='Título' value={buscar} color='warning'
                                size='small' variant='outlined'
                                sx={{
                                    flexGrow: 1, bgcolor: '#fafafa50',
                                    borderRadius: '5px', mr: { xs: 0, md: 3 }
                                }}
                                onChange={((e) => setBuscar(e.target.value))}
                            />
                        </Grid>

                        <Grid item xs={12} md={2} display='flex'
                            alignItems='center' justifyContent='space-between'>
                            <Button sx={{ m: 1 }} variant='outlined' color="inherit"
                                onClick={arquivados}>Arquivados</Button>
                            <Button sx={{ m: 1 }} color="info" onClick={deslogar}>Logout</Button>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Novo Recado</DialogTitle>

                {alerta && <MeuAlert titulo='Erro ao criar recado'
                    mensagem='Você deve preencher todos os campos' severity='error' />}

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Titulo"
                        label="Titulo"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setTitulo(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="Descricao"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setDescricao(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        type="date"
                        variant="standard"
                        sx={{ mt: 2 }}
                        onChange={((e) => setData(e.target.value))}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancelar</Button>
                    <Button onClick={addRecado} color='success'>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};