import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../tools/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let exisitingUser = await prisma.user.findFirst({
      where: { email},
    });
    if (exisitingUser) {
      return res.status(200).json({ message: "User exists already" });
    }
    exisitingUser = await prisma.user.findFirst({
      where: { username},
    });
    //console.log(exisitingUser);
    if (exisitingUser) {
      return res.status(200).json({ message: "User exists already" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    //console.log(newUser);
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    //console.log(err);
    return res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    //console.log(user);
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;
    console.log(userInfo)
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    //console.log(err);
    return res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  return res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const currentUser = async (req, res) => {
  const id = req.userId
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    const { password: userPassword, ...userInfo } = user;
    return res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to get current user" });
  }
};
