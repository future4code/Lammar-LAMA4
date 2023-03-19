import { CustomError } from "../error/CustomError";
import { user } from "../model/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  public createUser = async (user: user) => {
    try {
      await UserDatabase.connection
      .insert(user)
      .into ("LAMA_USERS")
    } catch (error:any) {
        throw new CustomError(400, error.message)
    }
  }

  public getUserByEmail = async(email: string): Promise<any> => {
    try {
      const result = await UserDatabase.connection
      .select("*")
      .from("LAMA_USERS")
      .where({ email });

      return result[0];
    } catch(error:any) {
        throw new CustomError(400, error.message);
    }
  }

}
