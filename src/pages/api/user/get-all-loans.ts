import handler from "../../../apiHandlers/handler";
import { client, q } from "../../../lib/fauna";

export default handler.post(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(404).json({ msg: "Something is Wrong" });
  }

  try {
    // const { data }: any = await client.query(
    //   q.Get(q.Match(q.Index("search_by_id_in_loans"), userId))
    // );

    const { data }: any = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("search_by_id_in_loans"), userId)),
        q.Lambda("ref", q.Get(q.Var("ref")))
      )
    );

    return res.status(200).json(data);
  } catch (e) {
    console.log("hello");
    return res.status(422).json({ Error: "Error" });
  }
});
