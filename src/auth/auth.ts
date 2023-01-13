import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type User = {
  id: string;
  username: string;
};

export const createJwtToken = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const comparePassword = (password: string, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 6);
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "Check your credentials" });
    return;
  }

  const [, token] = bearer.split("  ");

  if (!token) {
    res.status(401);
    res.json({ message: "Check the token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.json({ message: "Invalid token" });
    return;
  }
};
