import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const { data } = req.body;
  if (!data) {
    res.status(422).json("User Data Not Found");
  }

  try {
    req.session.set("user", data);
    await req.session.save();
    res.status(200).json("Session Changed");
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
});
