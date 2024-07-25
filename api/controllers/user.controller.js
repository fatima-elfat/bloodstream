import bcrypt from "bcrypt";
import prisma from "../tools/prisma.js";
import crypto from "crypto";
import * as otpauth from "otpauth";
import * as qrcode from "qrcode";
import base32 from "base32";

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
      } catch (error) {
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  
  await prisma.tech.update({
    where: { userid: id },
    data: {
        userId: null,
    },
  });
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
		const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
		if (!user) return res.status(400).send({ message: "Invalid link" });
		const token = await prisma.token.findUnique({
      where:{
        id: user.id,
        value: req.params.token,
      }
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
		await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
      },
    });
    await prisma.token.delete({
      where: { id: user.id },
    });
		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
};

export const generateMfA = async (req, res) => {
  const userId = req.userId 
  const user =  await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return res.status(400).send({
    message: "Failed to get users!"
  });
  if (user.tfEnabled) {
    return res.status(400).send({ message: "2FA already enabled" });
  }
  const buffer = crypto.randomBytes(15);
  const secret = base32.encode(buffer).replace(/[0198=]/g, "").substring(0, 24);
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      tfSecret: secret,
    },
  });
  let otp = new otpauth.TOTP({
    issuer: "bloodstream.ma",
    label: "BloodStream",
    algorithm: "SHA1",
    digits: 6,
    secret: secret,
  });
  let otpUrl = otp.toString();
  await qrcode.toDataURL(otpUrl, (error, qrUrl) => {
    if(error) {
      return res.status(500).send({ message: "Error generating QR code" });
    }
    res.status(200).json({ data: {
      qrCodeUrl: qrUrl,
      secret: secret
    }}); 
  });
};

export const verifyMfA = async (req, res) => {
  const userId = req.userId
  const token = req.body
  const user =  await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return res.status(400).send({
    message: "Failed to get users!"
  });
  let otp = new otpauth.TOTP({
    issuer: "bloodstream.ma",
    label: "BloodStream",
    algorithm: "SHA1",
    digits: 6,
    secret: user.tfSecret,
  });
  if(otp.validate({ token })) {
    if (!user.tfEnabled) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          tfEnabled: true,
        },
      });
    }
    res.status(200).json({message: "2F verification  successful"})
  } else {
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const deleteMfA = async (req, res) => {
  const userId = req.userId
  const user =  await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return res.status(400).send({
    message: "Failed to get users!"
  });
  await prisma.user.update({
    where: { id: userId },
    data: {
      tfEnabled: false,
      tfSecret: "",
    },
  });
  res.status(200).json({message: "2F disabled  successfully"})
};
