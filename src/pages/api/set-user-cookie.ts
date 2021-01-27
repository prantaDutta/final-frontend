import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  const { data } = req.body;
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  if (!data) {
    res.status(422).send("Something is Wrong");
  }
  (req as any).session.set("user", data);
  await (req as any).session.save();
  res.end();
});
