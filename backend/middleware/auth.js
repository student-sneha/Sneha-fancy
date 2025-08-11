import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to req object (not req.body)
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
