import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { NextApiRequestExtended } from "../utils/randomTypes";

export default nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, _req, res) {
    res
      .status(501)
      .json({ error: `Sorry Something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `${req.method} Method is Not Allowed` });
  },
});
