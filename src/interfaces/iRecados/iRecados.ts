export interface IRecados {
    id?: string,
    proprietario: string;
    titulo: string,
    descricao: string,
    data: string,
    deletado?: boolean,
    arquivado?: boolean,
};