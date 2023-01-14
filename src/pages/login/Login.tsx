import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Grid, Paper } from "@mui/material";
import { MeuInput } from '../../components/meuinput/MeuInput';
import { MeuBotao } from '../../components/meubotao/MeuBotao';
import { MeuTitulo } from '../../components/titulo/Titulo';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { MeuAlert } from '../../components/meuAlert/MeuAlert';
import { logarUsuarioThunk } from '../../store/modules/userSlice/UserSlice';
import storage from 'redux-persist/lib/storage';
import { IResposta } from '../../interfaces/iResposta/iResposta';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundImage: `linear-gradient(to bottom right, #340511, black)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const MeuPaper = styled(Paper)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '15px',
    opacity: '70%',
    background: '#ffffff',
    filter: 'drop-shadow(0px 0px 20px white)',
}));

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [alerta, setAlerta] = useState(false);
    const loginData: IResposta = useAppSelector((state) => state.usuarios);
    const dispatch = useAppDispatch();
    const primeiraExecucao = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {

        if (loginData.dados) {
            alert('ALERTA DO SISTEMA: \n Você ja está logado!');
            navegaRecados();
            return;
        }

    }, []);

    useEffect(() => {
        if (primeiraExecucao.current) {
            primeiraExecucao.current = false;
            return;
        }

        if (!loginData.sucesso) {
            alertaLogin();
            return;
        }

        navegaRecados();

    }, [dispatch, loginData]);

    const logarClick = () => {
        if (verificarCampos()) {
            const logarUsuario = {
                email: email,
                senha: password,
            }

            dispatch(logarUsuarioThunk(logarUsuario));
        }
    }

    const verificarCampos = (): boolean => {
        if (!email) {
            alertaLogin();
            return false;
        }

        if (!password) {
            alertaLogin();
            return false;
        }

        return true;
    }

    function navegaRecados() {
        return navigate('/recados');
    }

    function navegaCadastro() {
        return navigate('/cadastro');
    }

    const alertaLogin = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false);
        }, 3000);
    }

    return (
        <>
            {alerta && <MeuAlert titulo='Erro ao Logar'
                mensagem={loginData.mensagem}
                severity='error'
            />}

            <MeuContainer container>
                <Grid item xs={8} md={4}>
                    <MeuPaper elevation={24}>
                        <MeuTitulo
                            variant='h4' align='center'
                            texto='Entrar na página de recados'
                        />


                        <MeuInput
                            label='E-mail' type='email' variant='standard'
                            placeholder='E-mail' color='primary'
                            size='medium' value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <MeuInput
                            label='Senha' type='password' variant='standard'
                            placeholder='Senha' color='primary'
                            size='medium' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <MeuBotao
                            texto='Entrar' color='primary'
                            size='medium' variant='outlined'
                            onClick={logarClick}
                        />

                        <MeuBotao
                            texto='não possui conta?' color='info'
                            size='small' variant='text'
                            onClick={navegaCadastro}
                        />
                    </MeuPaper>
                </Grid>
            </MeuContainer>
        </>
    );
}