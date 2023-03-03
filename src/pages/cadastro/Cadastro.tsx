import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import { MeuTitulo } from '../../components/titulo/Titulo';
import { MeuInput } from '../../components/meuinput/MeuInput';
import { MeuBotao } from '../../components/meubotao/MeuBotao';
import { useAppDispatch, useAppSelector } from '../../store/modules/hooks';
import { AlertProps, MeuAlert } from '../../components/meuAlert/MeuAlert';
import { instanciaUsuarios } from '../../services/classes/usuario/usuario';
import { IResposta } from '../../interfaces/iResposta/iResposta';

const MeuContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom right, black, #340511)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const MeuPaper = styled(Paper)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    opacity: '70%',
    background: '#fafafa',
    filter: 'drop-shadow(0px 0px 20px white)',
}));

export const Cadastro = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [alerta, setAlerta] = useState(false);
    const [severidadeAlerta, setSeveridadeAlerta] = useState<AlertProps["severity"]>('error');
    const [tituloAlerta, setTituloAlerta] = useState<string>('');
    const [mensagemAlerta, setMensagemAlerta] = useState<string>('');
    const navigate = useNavigate();


    const verificaCampos = (): boolean => {
        if (!email) {
            exibirErro('Digite um email');
            return false;
        }

        if (!password) {
            exibirErro('Digite uma senha');
            return false;
        }

        if (password !== rePassword) {
            exibirErro('As senhas não conferem');
            return false;
        }

        if (!email.match(/\S+@\S+\.\S/)) {
            exibirErro('Digite um email válido ( usuario@email.com )');
            return false;
        }
        return true
    }

    const CadastrarClick = () => {
        if (verificaCampos()) {
            cadastraUsuario();
        }
    }

    async function cadastraUsuario() {
        const novoUsuario = {
            email: email,
            senha: password,
        }

        const cadastro: IResposta = await instanciaUsuarios.cadastrarUsuario(novoUsuario);

        if (cadastro.sucesso === false) {
            exibirErro('Credenciais inválidas');
            limparCampos();
            return;
        }

        limparCampos();
        setSeveridadeAlerta('success');
        setTituloAlerta('Usuário cadastrado com sucesso');
        setMensagemAlerta(`Seja bem vindo a página de recados`);
        AlertaCadastro();

        setTimeout(() => {
            navegaLogin();
        }, 3200);

    }

    const exibirErro = (mensagemDeErro: string) => {
        setSeveridadeAlerta('error');
        setTituloAlerta('Erro ao cadastrar');
        setMensagemAlerta(mensagemDeErro);
        AlertaCadastro();
    }

    function limparCampos() {
        setEmail('');
        setPassword('');
        setRePassword('');
    }

    const AlertaCadastro = () => {
        setAlerta(true);

        setTimeout(() => {
            setAlerta(false)
        }, 3000);
    }

    function navegaLogin() {
        return navigate('/');
    }

    return (
        <>
            {alerta && <MeuAlert titulo={tituloAlerta}
                mensagem={mensagemAlerta} severity={severidadeAlerta}
            />}

            <MeuContainer container minHeight={'100vh'}>
                <Grid item xs={8} md={4}>
                    <MeuPaper elevation={24}>
                        <MeuTitulo
                            variant='h4' align='center'
                            texto='Crie sua Conta'
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

                        <MeuInput
                            label='Repetir Senha' type='password' variant='standard'
                            placeholder='Repetir Senha' color='primary'
                            size='medium' value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />

                        <MeuBotao
                            texto='Cadastrar' color='primary'
                            size='medium' variant='outlined'
                            onClick={CadastrarClick}
                        />

                        <MeuBotao
                            texto='Já possui conta?' color='info'
                            size='small' variant='text'
                            onClick={navegaLogin}
                        />
                    </MeuPaper>
                </Grid>
            </MeuContainer>
        </>
    );
};