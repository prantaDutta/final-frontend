import handler from "../../apiHandlers/handler";
import { client, q } from "../../lib/fauna";

export default handler.post(async (req, res) => {
  const { userId, email } = req.body;
  if (!userId || !email) {
    return res.status(404).json({ msg: "Something is Wrong" });
  }

  try {
    const { data }: any = await client.query(
      q.Get(q.Match(q.Index("search_by_email"), email))
    );
    if (data?.userId === userId) {
      return res.status(200).json({ msg: "Unique Email" });
    }
    return res.status(200).json({ msg: "Email Taken" });
  } catch (e) {
    console.log("hello");
    return res.status(200).json({ msg: "Unique Email" });
  }
});
