const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "3ba5a61ea4a336c777e657ebeec14104e5916901bed105b2e9e516712999a5dd";
const expiration = "1h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      console.log("no token");
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // console.log(data);
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    console.log("sign token running");
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
