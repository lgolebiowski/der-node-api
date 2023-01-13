import prisma from "./db";
import { comparePassword, createJwtToken, hashPassword } from "./auth/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJwtToken(user);
  res.json(token);
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json("Too bad");
    return;
  }
  const token = createJwtToken(user);
  res.status(200);
  res.json(token);
};
