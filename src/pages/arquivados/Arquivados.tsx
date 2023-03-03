import React from 'react';
import styled from '@emotion/styled';
import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { CardRecado } from '../../components/cardRecado/CardRecado';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { HeaderArquivados } from '../../components/headerArquivados/HeaderArquivados';
import { IResposta } from '../../interfaces/iResposta/iResposta';
import { IRecados } from '../../interfaces/iRecados/iRecados';
import { getRecadosArquivadosThunk } from '../../store/modules/recadosSlice/RecadosSlice';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    backgroundImage: 'linear-gradient(to top, black, #340511)',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

export const PageArquivados = () => {
    const loginData: IResposta = useAppSelector((state) => state.usuarios);
    const recadosArquivados: IResposta = useAppSelector(state => state.recados);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const recadosUsuario: Array<IRecados> = recadosArquivados.dados

    React.useEffect(() => {
        if (!loginData.dados) {
            navegaLogin();
            window.location.reload();
        }
    }, []);

    React.useLayoutEffect(() => {
        if (loginData) {
            getRecadosArquivados();
        }
    }, [dispatch]);

    async function getRecadosArquivados() {
        const idUsuario = await loginData.dados;
        dispatch(getRecadosArquivadosThunk(idUsuario));
    }

    function navegaLogin() {
        return navigate('/');
    }

    return (
        <MeuContainer container minHeight={'100vh'}>
            <HeaderArquivados />

            <Grid item xs={12} md={11} sx={{ mt: 3 }}>
                <Grid container spacing={3} >
                    {recadosUsuario && recadosUsuario.map((recado: IRecados) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={recado.idRecado}>
                            <CardRecado textoArq='Desarquivar' id={recado.idRecado} proprietario={recado.idUsuario}
                                titulo={recado.titulo} descricao={recado.descricao}
                                data={recado.data} key={recado.idRecado} onClickArq={'desarquivarRecado'} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </MeuContainer >
    );
}