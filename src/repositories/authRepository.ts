import connection from '../config/database.js';

export interface User {

    id: number,
    email: string,
    password: string

}

export type CreateUserData = Omit<User, 'id'>;

export async function insertUser (userData: CreateUserData) {
    
    const { email, password } = userData;

    connection.query<CreateUserData>(`
    
        INSERT INTO users(email, password)
        VALUES ($1, $2)

    `, [email, password]);

}

export async function findByEmail (email: string) {
    
    const result = await connection.query<User>(`

        SELECT * FROM users WHERE email=$1

    `, [email]);

    return result.rows[0];

}