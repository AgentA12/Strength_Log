import jwt from "jsonwebtoken";

const secret = "thisisthesecretkeyforstrengthLog!";
const expiration = "48h";

function authMiddleWare({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    console.log(data);
    req.user = data;
  } catch (error) {
    return error;
  }
}

function signToken({ username, _id }) {
  const payload = { username, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export { authMiddleWare, signToken };
