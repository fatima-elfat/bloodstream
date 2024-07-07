import prisma from "../tools/prisma.js";

export const addBank = async (req, res) => {
    const tokenUserId = req.userId;
    const { isAdmin, ...other} =  await prisma.user.findUnique({
      where: { id: tokenUserId },
    });

    if (!isAdmin) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    const { all } = req.body;
    try {
        const newBank = await prisma.bank.create({
          data: {
            ...all
          },
        });
        return res.status(201).json({ message: "Bank created successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Failed to create Bank!" });
      }
  };

export const getBanks = async (req, res) => {
  try {
    const banks = await prisma.bank.findMany();
    res.status(200).json(banks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get banks!" });
  }
};

export const getBank = async (req, res) => {
  const id = req.params.id;
  try {
    const bank = await prisma.bank.findUnique({
      where: { id },
    });
    res.status(200).json(bank);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get bank!" });
  }
};

export const updateBank = async (req, res) => {
  const id = req.params.id;
  const tokenBankId = req.userId;
  const bank = req.body;
  const { isAdmin, ...other} =  await prisma.user.findUnique({
    where: { id: tokenBankId },
  });

  if (id !== tokenBankId && !isAdmin) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {

    const updatedBank = await prisma.bank.update({
      where: { id },
      data: {
        ...bank,
      },
    });
    res.status(200).json(updatedBank);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update bank" });
  }
};

export const deleteBank = async (req, res) => {
  const id = req.params.id;
  const tokenBankId = req.userId;
  const { isAdmin, ...other} =  await prisma.user.findUnique({
    where: { id: tokenBankId },
  });
  const { ...info} =  await prisma.bank.findUnique({
    where: { id: id },
  });
  if (id !== tokenBankId && !isAdmin) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  const updatedUser = await prisma.tech.update({
    where: { bankId: id },
    data: {
        bankId: null,
    },
  });
  try {
    await prisma.bank.delete({
      where: { id },
    });
    res.status(200).json({ message: "Bank deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete bank!" });
  }
};
