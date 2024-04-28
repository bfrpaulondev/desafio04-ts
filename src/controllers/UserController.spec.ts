import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([{ name: 'User 1', email: 'user1@test.com' }, { name: 'User 2', email: 'user2@test.com' }])
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar erro se o nome do usuário não for informado', () => {
        const mockRequest = {
            body: {
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Deve retornar erro se o email do usuário não for informado', () => {
        const mockRequest = {
            body: {
                name: 'Nath'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    })

    it('Deve chamar a função getAllUsers', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
    })
    it('Deve deletar um usuário existente', () => {
        const mockRequest = {
            params: {
                id: 'user1@test.com' // ID do usuário a ser excluído
            }
        } as unknown as Request;
        const mockResponse = makeMockResponse();
    
        userController.deleteUser(mockRequest, mockResponse);
    
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado com sucesso' });
    });
    
    it('Deve retornar erro se o ID do usuário não for informado', () => {
        const mockRequest = {
            params: {} // Não inclui o ID do usuário
        } as Request;
        const mockResponse = makeMockResponse();
    
        userController.deleteUser(mockRequest, mockResponse);
    
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! ID do usuário obrigatório' });
    });
    
    it('Deve retornar erro se o usuário não for encontrado para exclusão', () => {
        const mockRequest = {
            params: {
                id: 'nonexistent@test.com'
            }
        } as unknown as Request;
        const mockResponse = makeMockResponse();
    
        userController.deleteUser(mockRequest, mockResponse);
    
        expect(mockResponse.state.status).toBe(500); // Supondo que você tenha escolhido retornar 500 em caso de falha na exclusão
        expect(mockResponse.state.json).toMatchObject({ message: 'Erro ao deletar usuário' });
    });
    
})
