import { applySession } from "next-iron-session";
import handler from "../../../../apiHandlers/handler";
import { client, q } from "../../../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../../../utils/constants";

export default handler.get(async (req, res) => {
  await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
  const user = (req as any).session.get("user");
  if (user?.role === "admin") {
    try {
      // const { data }: any = await client.query(
      //   q.Map(
      //     // get loan references
      //     q.Paginate(q.Documents(q.Collection("loans"))),
      //     // map over pages of loan references
      //     q.Lambda(
      //       "loanRef",
      //       q.Let(
      //         {
      //           loan: q.Get(q.Var("loanRef")),
      //           userId: q.Select(["data", "userId"], q.Var("loan")),
      //           // get on a match assumes the userId exists
      //           // and that there is only one result (in your case, many-to-one..
      //           // that's fine). It also assumes you have defined that index.
      //           user: q.Get(q.Match(q.Index("search_by_id"), q.Var("userId"))),
      //         },
      //         // And now we can then return whtatever we want (or could have
      //         // omitted the let and directly return an object)
      //         {
      //           loan: q.Var("loan"),
      //           user: q.Var("user"),
      //         }
      //       )
      //     )
      //   )
      // );
      // data.map((d: any) => {
      //   console.log(d.loan);
      //   console.log(d.user);
      // });
      // res.json(data);
      const { data }: any = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("search_by_mode"), "processing")),
          q.Lambda("ref", q.Get(q.Var("ref")))
        )
      );
      let modifiedData: Array<ModifiedLoanRequest> = [];
      data.map((data: any) => {
        const {
          monthlyInstallment,
          loanDuration,
          interestRate,
          amount,
          modifiedMonthlyInstallment,
          userId,
        } = data.data;
        modifiedData.push({
          amount,
          interestRate,
          loanDuration,
          monthlyInstallment,
          modifiedMonthlyInstallment,
          userId,
          id: data.ref.id,
        });
      });
      return res.status(200).json(modifiedData);
    } catch (e) {
      console.log(e);
      return res.status(422).send("Failed");
    }
  }
  return res.status(403).end("Lol, You are not admin 😇 😈 😏 ");
});

export type ModifiedLoanRequest = {
  monthlyInstallment: number;
  loanDuration: number;
  interestRate: number;
  amount: number;
  modifiedMonthlyInstallment: number;
  userId: string;
  id: number | string;
};
