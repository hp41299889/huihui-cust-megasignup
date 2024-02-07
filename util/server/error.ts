import { errorLog } from "./log";

export const errorHandler = (msg: string, error: any) => {
  errorLog(msg, error);
  return msg;
};
