import { IRecados } from "../../../interfaces/iRecados/iRecados";
import { api } from "../../api/api";

export class Recados {
    async criarNovoRecado(objeto: IRecados) {
        try {
            const resposta = await api.post('/recados/novoRecado', objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getAllRecadosAtivos(idUsuario: string) {
        try {
            const resposta = await api.get(`/recados/ativos/${idUsuario}`);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getRecadosArquivados(idUsuario: string) {
        try {
            const resposta = await api.get(`/recados/${idUsuario}/arquivado?arquivado=true`);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getRecadosPorNome(objeto: any) {
        const { idUsuario, titulo } = objeto;

        if (!titulo) {
            try {
                const resposta = await api.get(`/recados/ativos/${idUsuario}`);
                return resposta.data;
            } catch (error: any) {
                return error.response.data;
            }
        }
        try {
            const resposta = await api
                .get(`/recados/${idUsuario}/buscar?titulo=${titulo}`)
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getRecadosArquivadosPorNome(objeto: any) {
        const { idUsuario, titulo } = objeto;

        if (!titulo) {
            try {
                const resposta = await api.get(`/recados/${idUsuario}/arquivado?arquivado=true`);
                return resposta.data;
            } catch (error: any) {
                return error.response.data;
            }
        }
        try {
            const resposta = await api
                .get(`/recados/arquivados/${idUsuario}/buscar?titulo=${titulo}`)
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async editarRecado(objeto: IRecados) {
        try {
            const resposta = await api.put(`/recados/editar`, objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async desarquivarRecado(objeto: IRecados) {
        try {
            const resposta = await api.put(`/recados/editar/desarquivar`, objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };
};

export const instanciaRecados = new Recados();

