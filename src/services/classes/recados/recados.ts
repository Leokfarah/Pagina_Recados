import { IRecados } from "../../../interfaces/iRecados/iRecados";
import { api } from "../../api/api";

export class Recados {
    async criarNovoRecado(objeto: IRecados) {
        try {
            const resposta = await api.post('/novoRecado', objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getAllRecadosAtivos(userID: string) {
        try {
            const resposta = await api.get(`/recados/ativos/${userID}`);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getRecadosArquivados(userID: string) {
        try {
            const resposta = await api.get(`/recados/${userID}/arquivado?arquivado=true`);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getRecadosPorNome(objeto: any) {
        const { userID, titulo } = objeto;

        if (!titulo) {
            try {
                const resposta = await api.get(`/recados/ativos/${userID}`);
                return resposta.data;
            } catch (error: any) {
                return error.response.data;
            }
        }
        try {
            const resposta = await api
                .get(`/recados/${userID}/buscar?titulo=${titulo}`)
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async getRecadosArquivadosPorNome(objeto: any) {
        const { userID, titulo } = objeto;

        if (!titulo) {
            try {
                const resposta = await api.get(`/recados/${userID}/arquivado?arquivado=true`);
                return resposta.data;
            } catch (error: any) {
                return error.response.data;
            }
        }
        try {
            const resposta = await api
                .get(`/recados/arquivados/${userID}/buscar?titulo=${titulo}`)
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async editarRecado(objeto: IRecados) {
        try {
            const resposta = await api.put(`/editar`, objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };

    async desarquivarRecado(objeto: IRecados) {
        try {
            const resposta = await api.put(`/editar/desarquivar`, objeto);
            return resposta.data;
        } catch (error: any) {
            return error.response.data;
        }
    };
};

export const instanciaRecados = new Recados();

