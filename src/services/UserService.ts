export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (userId: string): void => {
        const index = this.db.findIndex(user => user.email === userId);
    
        if (index !== -1) {
            this.db.splice(index, 1);
            console.log('Usuário deletado:', userId);
            console.log('DB atualizado:', this.db);
        } else {
            throw new Error('Usuário não encontrado');
        }
    }
    
}

