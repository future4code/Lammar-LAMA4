import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import BaseDatabase from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {
    public createBand = async (req: Request, res: Response) => {
        try {

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string
            };
            
            const bandBusiness = new BandBusiness()
            await bandBusiness.createBand(input)
        
            res.status(201).send({ message: "Banda criada!"});
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
        
            const input: LoginInputDTO = {
                email,
                password,
            };
            const userBusiness = new UserBusiness()
            const token = await userBusiness.login(input);
    
            res.status(200).send({ message: "Usuário logado!", token });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }; 
}