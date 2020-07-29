declare namespace Express {
    export interface Request {
        // aqui não substitui o request e sim faz um anexo
        user: {
            id: string;
        };
    }
}
