import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BandNameAlreadyExists, InvalidName, NotNullMusicGenre, NotNullName, NotNullResponsible, NotNullToken, Unauthorized } from "../error/BandError";
import { BandInputDTO, band } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";

const idGenerator = new IdGenerator()
const tokenGenerator = new Authenticator()
const bandDatabase = new BandDatabase();

export class BandBusiness {

    public createBand = async (input: BandInputDTO): Promise<any> => {
        try {
            const { name, music_genre, responsible, token} = input;
    
            if (!name) {
                throw new NotNullName()
            }

            if (!music_genre)  {
                throw new NotNullMusicGenre()
            }

            if (!responsible) {
                throw new NotNullResponsible()
            }

            if (!token) {
                throw new NotNullToken()
            }

            if (name.length < 4) {
                throw new InvalidName();
            }
        
            const result = await bandDatabase.getBandByName(name)

            if (result.length > 0) {
                throw new BandNameAlreadyExists()
            }
        
            const data = tokenGenerator.getData(token)

            if(data.role?.toLocaleUpperCase() !== "ADMIN") {
                throw new Unauthorized
            }

            const id: string = idGenerator.generate()
                
            const band: band = {
                id,
                name,
                music_genre,
                responsible
            };
        
            await bandDatabase.createBand(band);

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getBandByName = async (name: string, token:string) => {
        
    }
}