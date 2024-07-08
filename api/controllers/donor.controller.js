import prisma from "../tools/prisma.js";

export const addDonor = async (req, res) => {
    const tokenUserId = req.userId;
    const id = req.params.id;
    const { isTech, ...other} =  await prisma.user.findUnique({
      where: { id: tokenUserId },
    });

    if (!isTech) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    const { ...all } = req.body;
    try {
        let exisitingDonor = await prisma.donor.findFirst({
            where: { userId: id},
          });
          if (exisitingDonor) {
            return res.status(200).json({ message: "Donor exists already" });
          }
          const newDonor = await prisma.donor.create({
            data: {
              ...all,
              userId: id
            },
          });
          const updatedUser = await prisma.user.update({
              where: { id },
              data: {
                  isDonnor: true,
              },
            });
        return res.status(201).json({ message: "Donor created successfully" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create Donor!" });
      }
  };

export const getDonors = async (req, res) => {
  try {
    const donors = await prisma.donor.findMany({
      include: {
        user: {
          omit: {
            password: true,
          }
        }
      },
    });
    res.status(200).json(donors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get donors!" });
  }
};

export const getDonor = async (req, res) => {
  const id = req.params.id;
  try {
    const donor = await prisma.donor.findUnique({
      include: {
        user: {
          omit: {
            password: true,
          }
        }
      },
      where: { id },
    });
    res.status(200).json(donor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get donor!" });
  }
};

export const updateDonor = async (req, res) => {
  const id = req.params.id;
  const tokenDonorId = req.userId;
  const donor = req.body;
  const { isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokenDonorId },
  });

  if (!isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {

    const updatedDonor = await prisma.donor.update({
      where: { id },
      data: {
        ...donor,
      },
    });
    res.status(200).json(updatedDonor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update donor" });
  }
};

export const deleteDonor = async (req, res) => {
  const id = req.params.id;
  const tokenDonorId = req.userId;
  const { isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokenDonorId },
  });
  const { ...info} =  await prisma.donor.findUnique({
    where: { id: id },
  });
  if (!isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    await prisma.donor.delete({
      where: { id },
    });
    res.status(200).json({ message: "Donor deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete donor!" });
  }
};
