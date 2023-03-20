import { CustomError } from "../error/CustomError";
import { band } from "../model/Band";
import BaseDatabase from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

  public createBand = async (band: band) => {
    try {
      await BaseDatabase.connection
      .insert(band)
      .into ("LAMA_BANDS")
    } catch (error:any) {
        throw new CustomError(400, error.message)
    }
  }

  public getBandByName = async(name: string): Promise<string[]> => {
    try {
      const result = await BandDatabase.connection
      .select("*")
      .from("LAMA_BANDS")
      .where({ name } );

      return result;
    } catch(error:any) {
        throw new CustomError(400, error.message);
    }
  }

}
