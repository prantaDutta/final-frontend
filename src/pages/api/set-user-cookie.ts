import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  const { data } = req.body;
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  if (data) {
    (req as any).session.set("user", data);
  } else {
    (req as any).session.unset("user");
  }
  await (req as any).session.save();
  res.end();
});
