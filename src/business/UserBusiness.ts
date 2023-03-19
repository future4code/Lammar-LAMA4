import { UserInputDTO, LoginInputDTO, UserRole, user } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidName, InvalidEmail, InvalidUser, InvalidPassword, UserNotFound, NotNullName, NotNullEmail, NotNullRole, NotNullPassword } from "../error/UserError";
import { CustomError } from "../error/CustomError";

const idGenerator = new IdGenerator()
const tokenGenerator = new Authenticator()
const userDatabase = new UserDatabase();
const hashManager = new HashManager();

export class UserBusiness {

    public createUser = async (input: UserInputDTO): Promise<string> => {
        try {
            const { name, email, password, role } = input;
    
            if (!name) {
                throw new NotNullName()
            }

            if (!email) {
                throw new NotNullEmail()
            }

            if (!role) {
                throw new NotNullRole()
            }

            if (!password) {
                throw new NotNullPassword()
            }
        
            if (name.length < 4) {
                throw new InvalidName();
            }
        
            if (!email.includes("@")) {
                throw new InvalidEmail();
            }
        
            if (role.toLocaleUpperCase() !== UserRole.ADMIN && role.toLocaleUpperCase() !== UserRole.NORMAL) {
                throw new InvalidUser()
            }
        
            const id: string = idGenerator.generate()
        
            const hashPassword: string = await hashManager.hash(password)
        
            const user: user = {
                id,
                name,
                email,
                password: hashPassword,
                role
            };
        
            await userDatabase.createUser(user);
            const token = tokenGenerator.generateToken({id, role})
        
            return token
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public login = async (input: LoginInputDTO): Promise<string> => {
        try {
            const { email, password } = input;
            
            if (!email) {
                throw new NotNullEmail
            }
        
            if (!password) {
                throw new NotNullPassword
            }

            if (!email.includes("@")) {
                throw new InvalidEmail();
            }
        
            const user = await userDatabase.getUserByEmail(email);
        
            if (!user) {
                throw new UserNotFound()
            }
        
            const compareResult: boolean = await hashManager.compare(password, user.password)
        
            if(!compareResult){ 
                throw new InvalidPassword()
            }
        
            const token = tokenGenerator.generateToken({id:user.id, role:user.role})
        
            return token
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}