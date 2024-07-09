import prisma from "../tools/prisma.js";

export const addDonation = async (req, res) => {
    const tokenUserId = req.userId;
    const { id, ...other} =  await prisma.tech.findUnique({
      where: { userId: tokenUserId },
    });
    
    if (!id) {
        return res.status(403).json({ message: "Not Authorized!" });
    }
    const { ...all } = req.body;
    try {
        const newDonation = await prisma.donation.create({
          data: {
            ...all,
            techId: id
          },
        });
        return res.status(201).json({ message: "Donation created successfully" });
      } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Failed to create Donation!" });
      }
  };

export const getDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        tech: {
          include: {
            user: {
              omit: {
                password: true,
              }
            }
          },
          include: {
            bank: true,
          },
        },
      },
    });
    res.status(200).json(donations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get donations!" });
  }
};

export const getDonation = async (req, res) => {
  const id = req.params.id;
  try {
    const donation = await prisma.donation.findUnique({
      include: {
        tech: {
          include: {
            user: {
              omit: {
                password: true,
              }
            }
          },
          include: {
            bank: true,
          },
        },
      },
      
      where: { id },
    });
    res.status(200).json(donation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get donation!" });
  }
};

export const updateDonation = async (req, res) => {
  const id = req.params.id;
  const tokenDonationId = req.userId;
  const donation = req.body;
  const { isAdmin, isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokenDonationId },
  });

  if (id !== tokenDonationId && !isAdmin && !isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {

    const updatedDonation = await prisma.donation.update({
      where: { id },
      data: {
        ...donation,
      },
    });
    res.status(200).json(updatedDonation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update donation" });
  }
};

export const deleteDonation = async (req, res) => {
  const donationId = req.params.id;
  const tokenUserId = req.userId;
  const { id, ...other} =  await prisma.tech.findUnique({
    where: { userId: tokenUserId },
  });

  if (!id) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    await prisma.donation.delete({
      where: { id:donationId },
    });
    res.status(200).json({ message: "Donation deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete donation!" });
  }
};
