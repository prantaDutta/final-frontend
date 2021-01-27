import { applySession } from "next-iron-session";
import handler from "../../apiHandlers/handler";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import {laravelApi} from "../../utils/api";

export default handler.post(async (req, res) => {
  const { email, password } = req.body.values;
  if (!email || !password) {
    return res.status(406).json({
      error: "Something Went Wrong",
    });
  }

  try {
    const res = await laravelApi(true).get('/sanctum/csrf-cookie');
    console.log(res)
    const {data} = await laravelApi().post('/login', req.body.values);
    console.log('data', data)
    const { id, name, email, role, verified } = data.data;
    await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
    (req as any).session.set("user", data);
    await (req as any).session.save();
    // @ts-ignore
    return res.status(200).json({
      id,
      name,
      email,
      role,
      verified,
    });
  } catch (e) {
    console.log(e.response)
    return res.status(422).json({
      email: "Incorrect Credentials",
    });
  }
});
