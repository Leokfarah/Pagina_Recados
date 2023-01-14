import React from 'react';
import styled from '@emotion/styled';
import { Grid, Paper } from "@mui/material";
import { HeaderRecados } from '../../components/headerRecados/HeaderRecados';
import { useNavigate } from 'react-router-dom';
import { CardRecado } from '../../components/cardRecado/CardRecado';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { getRecadosAtivosThunk } from '../../store/modules/recadosSlice/RecadosSlice';
import { IResposta } from '../../interfaces/iResposta/iResposta';
import { IRecados } from '../../interfaces/iRecados/iRecados';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'linear-gradient(to bottom, black, #340511)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const PageRecados = () => {
    const loginData: IResposta = useAppSelector((state) => state.usuarios);
    const recadosAtivos: IResposta = useAppSelector(state => state.recados);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const recadosUsuario: Array<IRecados> = recadosAtivos.dados

    React.useEffect(() => {
        if (!loginData.dados) {
            navegaLogin();
            window.location.reload();
        }
    }, []);

    React.useLayoutEffect(() => {
        if (loginData) {
            getRecadosAtivos();
        }
    }, [dispatch]);

    function getRecadosAtivos() {
        const idUsuario = loginData.dados.at(0);
        dispatch(getRecadosAtivosThunk(idUsuario));
    }

    function navegaLogin() {
        return navigate('/');
    }

    return (
        <MeuContainer container>
            <HeaderRecados />

            <Grid item xs={12} md={11} sx={{ mt: 3 }}>
                <Grid container spacing={3} >
                    {recadosUsuario && recadosUsuario.map((recado: IRecados) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={recado.id}>
                            <CardRecado textoArq='Arquivar' id={recado.id} proprietario={recado.proprietario}
                                titulo={recado.titulo} descricao={recado.descricao}
                                data={recado.data} key={recado.id} onClickArq={'arquivarRecado'} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </MeuContainer >
    );
}