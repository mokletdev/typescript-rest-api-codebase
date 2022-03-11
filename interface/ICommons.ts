export interface ICode {
  SUCCESS: Number;
  NOT_FOUND: Number;
  BAD_REQUEST: Number;
  INTERNAL_ERROR: Number;
  SERVICE_UNAVAILABLE: Number;
}

export interface IOptions {
  cors: Object;
  parser: Object;
}
