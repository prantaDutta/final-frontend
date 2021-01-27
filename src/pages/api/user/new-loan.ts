import handler from "../../../apiHandlers/handler";
import { client, q } from "../../../lib/fauna";
import { LoanMode } from "../../../utils/randomEnums";

export default handler.post(async (req, res) => {
  const { values, userId } = req.body;
  if (!values && !userId) {
    return res.status(404).json({ msg: "Something is Wrong" });
  }

  values.mode = LoanMode.Processing;
  values.userId = userId;

  try {
    const { data }: any = await client.query(
      q.Create(q.Collection("loans"), {
        data: values,
      })
    );

    return res.status(200).json(data);
  } catch (e) {
    console.log("hello");
    return res.status(422).json({ Error: "Error" });
  }
});
