import { applySession } from "next-iron-session";
import handler from "../../../../apiHandlers/handler";
import { client, q } from "../../../../lib/fauna";
import {
  NEXT_IRON_SESSION_CONFIG,
  uuidFormatRegex,
} from "../../../../utils/constants";

export default handler.get(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  const user = (req as any).session.get("user");
  if (user.role === "admin") {
    const {
      query: { request },
    } = req;
    if (uuidFormatRegex.test(request as any)) {
      try {
        const { data }: any = await client.query(
          q.Get(q.Match(q.Index("search_by_id"), request as any))
        );
        delete data.password;
        return res.status(200).json(data);
      } catch (e) {
        console.log(e);
        return res.status(422).send("Failed");
      }
    }
    return res.status(403).end("Lol, uuid is not valid 😇 😈 😏 ");
  }
  return res.status(403).end("Lol, You are not admin 😇 😈 😏 ");
});
