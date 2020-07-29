import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Email ou senha incorretos');
        }

        // user.password - senha criptografada presente no banco
        // password - senha fornecida pelo usuário, não cript

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email ou senha incorretos');
        }

        return {
            user,
        };
    }
}

export default AuthenticateUserService;
