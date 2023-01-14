import * as React from 'react';
import {
    TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Card, CardActions, CardContent, Grid, Typography, Box,
} from "@mui/material";
import { MeuBotao } from '../meubotao/MeuBotao';
import { useAppDispatch } from '../../store/modules/hooks';
import { MeuAlert } from '../meuAlert/MeuAlert';
import { desarquivarRecadoThunk, editarRecadoThunk } from '../../store/modules/recadosSlice/RecadosSlice';

export const CardRecado = ({ id, proprietario, titulo, descricao, data, textoArq, onClickArq }: any) => {
    const [open, setOpen] = React.useState(false);
    const [newTitulo, setNewTitulo] = React.useState('');
    const [newDescricao, setNewDescricao] = React.useState('');
    const [newDate, setNewDate] = React.useState('');
    const [alerta, setAlerta] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setNewTitulo(titulo);
        setNewDescricao(descricao);
        setNewDate(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateRecado = () => {
        if (!newDescricao && !newTitulo) {
            alertaRecados();
            return
        }

        dispatch(editarRecadoThunk({
            proprietario: proprietario,
            titulo: newTitulo,
            descricao: newDescricao,
            data: newDate,
            id: id,
            deletado: false,
            arquivado: false,
        }));
        handleClose();
    }

    function deleteRecado() {
        dispatch(editarRecadoThunk({
            proprietario: proprietario,
            titulo: titulo,
            descricao: descricao,
            data: data,
            id: id,
            deletado: true,
            arquivado: false,
        }));
    }

    function arquivarRecado() {
        dispatch(editarRecadoThunk({
            proprietario: proprietario,
            titulo: titulo,
            descricao: descricao,
            data: data,
            id: id,
            deletado: false,
            arquivado: true,
        }));
    }

    function desarquivarRecado() {
        dispatch(desarquivarRecadoThunk({
            proprietario: proprietario,
            titulo: titulo,
            descricao: descricao,
            data: data,
            id: id,
            deletado: false,
            arquivado: false,
        }));
    }

    const alertaRecados = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false)
        }, 4000);
    }

    function verificaAcao() {
        if (onClickArq === 'arquivarRecado') {
            return arquivarRecado();
        }
        if (onClickArq === 'desarquivarRecado') {
            return desarquivarRecado();
        }
    }

    function botaoEditarOn() {
        if (onClickArq === 'arquivarRecado') {
            return true;
        }
        if (onClickArq === 'desarquivarRecado') {
            return false;
        }
    }

    return (
        <Card sx={{ minWidth: 200 }} elevation={5}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {data}
                </Typography>

                <Typography variant="h5" component="div">
                    {titulo}
                </Typography>

                <Typography variant="body2" marginTop={1} textAlign="justify">
                    {descricao}
                </Typography>

            </CardContent>

            <CardActions>
                <Grid container justifyContent={'flex-end'} flexWrap={'nowrap'}>
                    <MeuBotao texto={textoArq} color='info'
                        size='small' variant='text'
                        sx={{ alignSelf: 'flex-start' }}
                        onClick={verificaAcao}
                    />

                    {botaoEditarOn() ? <MeuBotao texto='editar' color='secondary'
                        size='small' variant='contained'
                        onClick={handleClickOpen} /> : <></>}

                    {botaoEditarOn() ? <MeuBotao texto='deletar' color='error'
                        size='small' variant='contained'
                        onClick={() => {
                            if (window.confirm('ALERTA DO SISTEMA: \n Tem certeza que deseja excluir este recado?')) {
                                deleteRecado();
                            }
                        }}
                    /> : <></>}


                </Grid>
            </CardActions>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Recado</DialogTitle>

                {alerta && <MeuAlert titulo='Erro ao editar recado'
                    mensagem='Você deve digitar o titulo e descrição' severity='error'
                />}

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Titulo"
                        label='Titulo'
                        placeholder={titulo}
                        value={newTitulo}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setNewTitulo(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="Descricao"
                        label='Descricao'
                        placeholder={descricao}
                        value={newDescricao}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={((e) => setNewDescricao(e.target.value))}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data"
                        type="date"
                        value={newDate}
                        variant="standard"
                        sx={{ mt: 2 }}
                        onChange={((e) => setNewDate(e.target.value))}
                    />
                </DialogContent>

                <DialogActions>
                    <MeuBotao
                        texto='Cancelar' color='error'
                        size='small' variant='text'
                        onClick={handleClose}
                    />

                    <MeuBotao
                        texto='Atualizar' color='success'
                        size='small' variant='text'
                        onClick={updateRecado}
                    />
                </DialogActions>

            </Dialog>
        </Card>
    );
};