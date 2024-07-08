import prisma from "../tools/prisma.js";

export const addDonationRecord = async (req, res) => {
  const donorId = req.params.id;
  const tokenUserId = req.userId;
    const { isTech, ...other} =  await prisma.user.findUnique({
        where: { id: tokenUserId },
    });
    
    if (!isTech) {
        return res.status(403).json({ message: "Not Authorized!" });
    }
    const { ...all } = req.body;
    try {
        const newDonationRecord = await prisma.donationRecord.create({
          data: {
            ...all,
            donorId,
          },
        });
        const updatedDonationRecord = await prisma.donor.update({
          where: { id: donorId },
          data: {
            lastDonation: new Date(),
          },
        });
        return res.status(201).json({ message: "Donation Record created successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Failed to create Donation Record!" });
      }
  };

export const getDonationRecords = async (req, res) => {
  try {
    const donationrecords = await prisma.donationRecord.findMany({
      include: {
        donor: {
          include: {
            user: {
              omit: {
                password: true,
              }
            }
          }
        }
      },
    });
    res.status(200).json(donationrecords);
  } catch (err) {
    res.status(500).json({ message: "Failed to get donation Records!" });
  }
};

export const getDonationRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const donationRecord = await prisma.donationRecord.findUnique({
      include: {
        donor: {
          include: {
            user: {
              omit: {
                password: true,
              }
            }
          }
        }
      },
      where: { id },
    });
    res.status(200).json(donationRecord);
  } catch (err) {
    res.status(500).json({ message: "Failed to get donation Record!" });
  }
};

export const updateDonationRecord = async (req, res) => {
  const id = req.params.id;
  const tokendId = req.userId;
  const donationRecord = req.body;
  const { isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokendId },
  });

  if (!isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {

    const updatedDonationRecord = await prisma.donationRecord.update({
      where: { id },
      data: {
        ...donationRecord,
      },
    });
    res.status(200).json(updatedDonationRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update donation Record" });
  }
};

export const deleteDonationRecord = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userId;
  const { isTech, ...other} =  await prisma.user.findUnique({
    where: { id: tokenId },
  });

  if (!isTech) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  const { ...info} =  await prisma.donationRecord.findUnique({
    where: { id: id },
  });
  try {
    await prisma.donationRecord.delete({
      where: { id },
    });
    res.status(200).json({ message: "Donation Record deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete donation Record!" });
  }
};
