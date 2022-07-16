import { CreateUserData, insertUser, findByEmail } from '../repositories/authRepository.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

const SALT = 10;

export async function signUpService (userData: CreateUserData) {
    
    const { email, password } = userData;
    const checkForEmail = await findByEmail(email);

    if (checkForEmail) {
        throw {
            type: 'conflict',
            message: 'E-mail: already in use'
        }
    }

    userData.password = await bcrypt.hash(password, SALT);

    await insertUser(userData);

}

export async function loginService(userData: CreateUserData) {

    const { email, password } = userData;
  
    const checkForUser = await findByEmail(email);
  
    if (!checkForUser || !(await bcrypt.compare(password, checkForUser.password))) {
        throw {
            type: 'unauthorized',
            message: 'Login: incorrect credentials or inexistent user'
        };
    }

    const token = Jwt.sign({ id: checkForUser.id, email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
  
    return token;

}