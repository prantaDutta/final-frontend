import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);

  const user = req.session.get("user");

  if (user) req.session.unset("user");

  await req.session.destroy();

  res.setHeader("cache-control", "no-store, max-age=0");

  res.status(200).json("Session Changed");
});
