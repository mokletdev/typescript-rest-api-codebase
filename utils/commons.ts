import { ICode, IOptions } from '../interface/ICommons';

export const code: Readonly<ICode> = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};


export const options: Readonly<IOptions> = {
  cors: { preflightMaxAge: 5 },
  parser: { multiples: true, mapParams: true }
};
