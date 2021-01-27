import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { ironSession } from "next-iron-session";
import { NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { NextApiRequestExtended } from "../utils/randomTypes";

export default nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, _req, res) {
    res
      .status(501)
      .json({ error: `Sorry Something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
}).use(ironSession({ ...NEXT_IRON_SESSION_CONFIG }));
