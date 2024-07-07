import prisma from "../tools/prisma.js";

export const addTech = async (req, res) => {
    const id = req.params.id;
    const tokenTechId = req.userId;
    const { isAdmin, ...other} =  await prisma.user.findUnique({
      where: { id: tokenTechId },
    });

    if (!isAdmin) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    const { title } = req.body;
    try {
        let exisitingTech = await prisma.tech.findFirst({
          where: { userId: id},
        });
        if (exisitingTech) {
          return res.status(200).json({ message: "Tech exists already" });
        }
        const newTech = await prisma.tech.create({
          data: {
            title,
            userId: id
          },
        });
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                isTech: true,
            },
          });
        return res.status(201).json({ message: "Tech created successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Failed to create Tech!" });
      }
  };

export const getTechs = async (req, res) => {
  try {
    const techs = await prisma.tech.findMany();
    res.status(200).json(techs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get techs!" });
  }
};

export const getTech = async (req, res) => {
  const id = req.params.id;
  try {
    const tech = await prisma.tech.findUnique({
      where: { id },
    });
    res.status(200).json(tech);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get tech!" });
  }
};

export const updateTech = async (req, res) => {
  const id = req.params.id;
  const tokenTechId = req.userId;
  const tech = req.body;
  const { isAdmin, ...other} =  await prisma.user.findUnique({
    where: { id: tokenTechId },
  });

  if (id !== tokenTechId && !isAdmin) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {

    const updatedTech = await prisma.tech.update({
      where: { id },
      data: {
        ...tech,
      },
    });
    res.status(200).json(updatedTech);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update tech" });
  }
};

export const deleteTech = async (req, res) => {
  const id = req.params.id;
  const tokenTechId = req.userId;
  const { isAdmin, ...other} =  await prisma.user.findUnique({
    where: { id: tokenTechId },
  });
  const { userId, ...info} =  await prisma.tech.findUnique({
    where: { id: id },
  });
  if (id !== tokenTechId && !isAdmin) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
        isTech: false,
    },
  });
  try {
    await prisma.tech.delete({
      where: { id },
    });
    res.status(200).json({ message: "Tech deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete tech!" });
  }
};
