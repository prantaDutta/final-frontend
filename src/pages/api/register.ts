import bcrypt from "bcrypt";
import { applySession } from "next-iron-session";
import { v4 as uuidv4 } from "uuid";
import handler from "../../apiHandlers/handler";
import { sendDataToFauna } from "../../lib/fauna";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";

export default handler.post(async (req, res) => {
  const { name, email, role, password } = req.body.values;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  try {
    const { data }: any = await sendDataToFauna({
      userId,
      name,
      email,
      role,
      password: hashedPassword,
    });
    delete data.password;
    await applySession(req, res, NEXT_IRON_SESSION_CONFIG);
    (req as any).session.set("user", data);
    await (req as any).session.save();
    return res.status(200).json({
      id: data.userId,
      name,
      email,
      role,
    });
  } catch (e) {
    throw new Error("Can't Insert Data");
  }
});
