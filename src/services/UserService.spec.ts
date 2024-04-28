import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })
    it('Deve retornar todos os usuários', () => {
        const users = userService.getAllUsers();
        expect(users).toEqual(mockDb);
    });
    
    it('Deve deletar um usuário existente', () => {
        const userToDelete: User = { name: 'Nath', email: 'nath@test.com' };
        mockDb.push(userToDelete); // Adicionando um usuário para deletar
    
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.deleteUser('nath@test.com');
    
        expect(mockConsole).toHaveBeenCalledWith('Usuário deletado:', 'nath@test.com');
        expect(mockDb).not.toContainEqual(userToDelete);
    });
    
    it('Deve lançar um erro ao tentar deletar um usuário inexistente', () => {
        const nonExistentUserId = 'nonexistent@test.com';
    
        expect(() => {
            userService.deleteUser(nonExistentUserId);
        }).toThrowError('Usuário não encontrado');
    });
    
})
