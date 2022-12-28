import cors from "cors";
import { Request } from "express";

type Callback = (error: Error | null, corsOptions: { origin: boolean; }) => void;

const whitelist = ['http://localhost:3000'];

/**
 *
 * @param req
 * @param callback WhiteListed Origin
 */
const corsOptionsDelegate = (req: Request, callback: Callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin') as string) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
const _cors = cors();
export { _cors as cors };
export const corsWithOptions = cors(corsOptionsDelegate);