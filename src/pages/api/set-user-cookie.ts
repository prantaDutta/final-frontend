import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  const { data } = req.body;

  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);

  if (data) {
    req.session.set("user", data);
  } else {
    req.session.unset("user");
  }
  await req.session.save();
  // res.setHeader("cache-control", "no-store, max-age=0");
  return res.status(200).json("Session Changed");
});
