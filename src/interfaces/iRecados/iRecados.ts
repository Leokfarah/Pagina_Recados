export interface IRecados {
    idRecado?: string,
    idUsuario: string;
    titulo: string,
    descricao: string,
    data: string,
    deletado?: boolean,
    arquivado?: boolean,
};