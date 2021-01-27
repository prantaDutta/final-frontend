import { applySession } from "next-iron-session";
import handler from "../../../../apiHandlers/handler";
import { client, q } from "../../../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../../../utils/constants";

export default handler.post(async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(500).json({ Error: "Error" });
  }
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  const user = (req as any).session.get("user");
  if (user.role === "admin") {
    try {
      await client.query(
        q.Update(
          q.Select(["ref"], q.Get(q.Match(q.Index("search_by_email"), email))),
          {
            data: {
              verified: "true",
            },
          }
        )
      );
      return res.status(200).json({ OK: "OK" });
    } catch (e) {
      console.log(e);
      return res.status(422).send("Failed");
    }
  }
  return res.status(403).end("Lol, You are not admin 😇 😈 😏 ");
});
