import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body;

        if (!user.name) {
            return response.status(400).json({ message: 'Bad request! Name obrigatório' });
        }

        if (!user.email) {
            return response.status(400).json({ message: 'Bad request! Email obrigatório' });
        }

        this.userService.createUser(user.name, user.email);
        return response.status(201).json({ message: 'Usuário criado' });
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers();
        return response.status(200).json(users);
    }

    deleteUser = (request: Request, response: Response): Response => {
        const userId = request.params.id; // Supondo que o ID do usuário seja passado como parâmetro na URL
    
        if (!userId) {
            return response.status(400).json({ message: 'Bad request! ID do usuário obrigatório' });
        }
    
        try {
            this.userService.deleteUser(userId);
            return response.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            return response.status(500).json({ message: 'Erro ao deletar usuário', error: "Error " });
        }
    }
    
}
