import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 403);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload; // as tipa a variável decoded com a interface

        request.user = {
            id: sub,
        };

        // o que é isso aqui em cima? por que o request reconhece o .user? Modificamos a namespace
        // do request dentro do Express para conter o atributo ID em user (./src/@types/express.d.ts)

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 403);
    }
}

export default ensureAuthenticated;
