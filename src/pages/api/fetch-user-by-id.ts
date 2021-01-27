import handler from "../../apiHandlers/handler";
import { client, q } from "../../lib/fauna";
import { UserAuthValues } from "../../utils/randomTypes";

export default handler.post(async (req, res) => {
  // if (req.token) {
  const { userId } = req.body;
  const { data }: any = await client.query(
    q.Get(q.Match(q.Index("search_by_id"), userId))
  );
  const { email, name, role }: UserAuthValues = data;

  return res.status(200).json({
    userId,
    name,
    email,
    role,
  });
  // }
  return res.status(422).json({ ERROR: "Error" });
});
