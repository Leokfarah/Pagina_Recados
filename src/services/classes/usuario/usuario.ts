import { IUser } from "../../../interfaces/iUser/iUser";
import { api } from "../../api/api";

export class Usuario {
    async cadastrarUsuario(objeto: IUser) {
        try {
            const resposta = await api.post('/cadastro', objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async logarUsuario(objeto: IUser) {
        try {
            const resposta = await api.post('/usuario', objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };
};

export const instanciaUsuarios = new Usuario();
