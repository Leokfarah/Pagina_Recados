import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecados } from "../../../interfaces/iRecados/iRecados";
import { IResposta } from "../../../interfaces/iResposta/iResposta";
import { instanciaRecados } from "../../../services/classes/recados/recados";

export const criarNovoRecadoThunk = createAsyncThunk<IResposta, IRecados>('/criar/recado', async (objeto) => {
    return await instanciaRecados.criarNovoRecado(objeto);
});

export const getRecadosAtivosThunk = createAsyncThunk<IResposta, string>('/recados/ativos', async (objeto) => {
    return await instanciaRecados.getAllRecadosAtivos(objeto);
});

export const getRecadosArquivadosThunk = createAsyncThunk<IResposta, string>('/recados/arquivados', async (objeto) => {
    return await instanciaRecados.getRecadosArquivados(objeto);
});

export const getRecadosNomesThunk = createAsyncThunk<IResposta, object>('/recados/nome', async (objeto) => {
    return await instanciaRecados.getRecadosPorNome(objeto);
});

export const getRecadosArquivadosNomesThunk = createAsyncThunk<IResposta, object>('/recados/nome', async (objeto) => {
    return await instanciaRecados.getRecadosArquivadosPorNome(objeto);
});

export const editarRecadoThunk = createAsyncThunk<IResposta, IRecados>('/recados/editar', async (objeto) => {
    return await instanciaRecados.editarRecado(objeto);
});

export const desarquivarRecadoThunk = createAsyncThunk<IResposta, IRecados>('/recados/desarquivar', async (objeto) => {
    return await instanciaRecados.desarquivarRecado(objeto);
});

const slice = createSlice({
    name: "recados",
    initialState: {} as IResposta,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(criarNovoRecadoThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload;
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        })
        builder.addCase(getRecadosAtivosThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload;
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        })
        builder.addCase(getRecadosArquivadosThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload;
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        })
        builder.addCase(getRecadosNomesThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload;
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        })
        builder.addCase(editarRecadoThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload;
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        })
        builder.addCase(desarquivarRecadoThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload;
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        })
    },
});

export default slice.reducer;