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
    backgroundImage: 'linear-gradient(to bottom, black, #340511)',
    backgroundRepeat: 'repeat',
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

    async function getRecadosAtivos() {
        const idUsuario = await loginData.dados;
        dispatch(getRecadosAtivosThunk(idUsuario));
    }

    function navegaLogin() {
        return navigate('/');
    }

    return (
        <MeuContainer container minHeight={'100vh'}>
            <HeaderRecados />

            <Grid item xs={12} md={11} sx={{ mt: 3 }}>
                <Grid container spacing={3} >
                    {recadosUsuario && recadosUsuario.map((recado: IRecados) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={recado.idRecado}>
                            <CardRecado textoArq='Arquivar' idRecado={recado.idRecado} idUsuario={recado.idUsuario}
                                titulo={recado.titulo} descricao={recado.descricao}
                                data={recado.data} key={recado.idRecado} onClickArq={'arquivarRecado'} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </MeuContainer >
    );
}