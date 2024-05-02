import * as bcrypt from 'bcrypt';

/**
 *
 * @param res : reponse
 * @param arg : {code, message, data,...}
 * @returns reponse.send()
 */
interface argI {
  code: number;
  message: string;
  token?: string;
  data?: any;
  saved?: boolean;
}

//
export const responseCreator = (res, arg: argI) => {
  return res.status(arg.code).send({ ...arg });
};

//
export const hashCrypte = async (data: any, salt: number) => {
  return await bcrypt.hashSync(data, salt);
};

//
export const compareCryte = async (data: string, salt: string) => {
  return await bcrypt.compareSync(data, salt);
};
