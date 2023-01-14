import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResposta } from "../../../interfaces/iResposta/iResposta";
import { IUser } from "../../../interfaces/iUser/iUser";
import { instanciaUsuarios } from "../../../services/classes/usuario/usuario";

export const logarUsuarioThunk = createAsyncThunk<IResposta, IUser>('/entrar/usuario', async (objeto) => {
    return await instanciaUsuarios.logarUsuario(objeto);
});

const Userslice = createSlice({
    name: "usuarios",
    initialState: {} as IResposta,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(logarUsuarioThunk.fulfilled, (state, action) => {
            const { sucesso, dados, mensagem } = action.payload
            state.sucesso = sucesso;
            state.dados = dados;
            state.mensagem = mensagem;
        });
    },
});

export default Userslice.reducer;
