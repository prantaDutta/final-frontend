import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  await (req as any).session.unset("user");
  return res.status(200).end();
});
