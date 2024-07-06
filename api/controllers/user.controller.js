import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../tools/prisma.js";

export const addUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { isAdmin, isTech, ...other} =  await prisma.user.findUnique({
      where: { id: tokenUserId },
    });

    if (!isAdmin && !isTech) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    const { username,
        email,
        mobileNumber,
        dateOfBirth,
        city
    } = req.body;
    //generate password and send an email as notif
    const password = "pswrd56"
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
        if (exisitingUser) {
          return res.status(200).json({ message: "User exists already" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            mobileNumber,
            dateOfBirth,
            city
          },
        });
        return res.status(201).json({ message: "User created successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Failed to create user!" });
      }
  };

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      omit: {
      password: true,
    }
  });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    const { password: userPassword, ...rest } = user;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { avatar, ...inputs } = req.body;
  const { isAdmin, isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokenUserId },
  });

  if (id !== tokenUserId && !isAdmin && !isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(avatar && { avatar }),
      },
    });

    const { password, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { isAdmin, isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokenUserId },
  });

  if (id !== tokenUserId && !isAdmin && !isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};
