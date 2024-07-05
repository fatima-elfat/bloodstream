import bcrypt from "bcrypt";
import prisma from "../../tools/prisma.js";
import { ResponseWithErrorsArray, generateObjectId } from "../../tools/response.js";
import { login, logout, register } from "../../controllers/auth.controller.js";
import request from "supertest";
import cookieParser from "cookie-parser";
import express from "express";

//let server = null

beforeAll(async () => {
  /**
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  server = app.listen();
  */
  const hashedPassword1 = await bcrypt.hash('odenBoiledAlone', 10);
  const hashedPassword2 = await bcrypt.hash('luffyIsLife', 10);
  await prisma.user.createMany({
    data: [{
      email: 'oden01@wano.op',
      username: 'OdenKosuki01',
      password: hashedPassword1
    },
    {
      email: 'boaHankok01@lilly.op',
      username: 'boaHankok01',
      password: hashedPassword2
    }],
  })
})
afterAll(async () => {
  const deleteUser = prisma.user.deleteMany()
  await prisma.$transaction([
    deleteUser,
  ])
  
  await prisma.$disconnect()
  //server.close();
})

describe("login user", () => {
  it("should not find the  1 user", async () => {
    const req = {
      body: {
        username: 'boaHankok02',
        password: 'luffyIsLife'
      }
    };
    const res = new ResponseWithErrorsArray();
    await login(req, res).then(() => {
      expect(res.statusCode).toBe(400);
      //console.log(res);
      expect(res.message).toBe("Invalid Credentials!");
    });
  });

  it("should not find the user due wrong password", async () => {
    const req = {
      body: {
        username: 'boaHankok01',
        password: 'luffyIsLifo'
      }
    };
    const res = new ResponseWithErrorsArray();
    await login(req, res).then(() => {
      expect(res.statusCode).toBe(400);
      //console.log(res);
      expect(res.message).toBe("Invalid Credentials!");
    });
  });

  /** 
   * there is error with the res.cookie 
  it("should find the user", async () => {
    // console.log(await prisma.user.count());
    const req = {
      body: {
        username: 'OdenKosuki01',
        password: 'odenBoiledAlone'
      }
    };
    const res = new ResponseWithErrorsArray();
    await login(req, res).then(() => {
      //console.log(res);
      expect(res.statusCode).toBe(200);
      //expect(res.message).toBe("Invalid Credentials!");
    });
  });
  */
});