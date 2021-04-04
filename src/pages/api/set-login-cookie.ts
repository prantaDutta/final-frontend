import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(422).json("User Data Not Found");
  }

  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);

  req.session.set("user", data);

  await req.session.save();

  res.status(200).json("Session Changed");
});
