import bcrypt from "bcrypt";
import prisma from "../../tools/prisma.js";
import request from "supertest";

beforeAll(async () => {
  await prisma.user.createMany({
    data: [{
      email: 'oden@wano.op',
      username: 'OdenKosuki',
      password: 'odenBoiledAlone'
    },
    {
      email: 'boaHankok@lilly.op',
      username: 'boaHankok',
      password: 'luffyIsLife'
    }],
  })
})
afterAll(async () => {
  const deleteUser = prisma.user.deleteMany()
  
  await prisma.$transaction([
    deleteUser,
  ])
  
  await prisma.$disconnect()
})

describe("user in DB", () => {
  it("should add 1 user", async () => {
    const beforeNbrUser = await prisma.user.count();
    const hashedPassword = await bcrypt.hash('thisis145', 10);
    await prisma.user.create({
      data: {
        email: 'momonoske@wano.op',
        username: 'momonoskeKosuki',
        password: hashedPassword
      },
    });
    expect(await prisma.user.count()).toBe(beforeNbrUser + 1);
  });

  it("should find user from email", async () => {
    const us01 = await prisma.user.findUnique({
      where: {
        email: "boaHankok@lilly.op",
      },
    })
    expect(us01).toHaveProperty('username', 'boaHankok');
  });

  it("should update 1 user", async () => {
    const us02 = await prisma.user.findUnique({
      where: {
        email: "boaHankok@lilly.op",
      },
    })
    expect(us02).toHaveProperty('password', 'luffyIsLife');
    const hashedPassword = await bcrypt.hash('luffyIsLife', 10);
    const uUs = await prisma.user.update({
      where: {
        email: "boaHankok@lilly.op",
      },
      data: {
        password: hashedPassword
      },
    })
    expect(uUs).toHaveProperty('password', hashedPassword);
  });

  it("should delete 1 user", async () => {
    const beforeNbrUser = await prisma.user.count();
    await prisma.user.delete({
      where: {
        email: "boaHankok@lilly.op",
      },
    })
    expect(await prisma.user.count()).toBe(beforeNbrUser - 1);
    const us03 = await prisma.user.findUnique({
      where: {
        email: "boaHankok@lilly.op",
      },
    })
    expect(us03).toBeNull;
  });
});