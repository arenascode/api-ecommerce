import mongoose from "mongoose";
import chai from "chai";
import { before, describe, it } from "mocha";
import axios from "axios";
import { PORT } from "../../src/config/server.config.js";
import * as mocks from "../mocks.js";
import assert, { ok } from "node:assert";

const mongoUrlString = "mongodb://localhost/test-ecommerce";

const baseURl = `http://localhost:${PORT}/api/sessions`;

describe("Sessions Route", () => {
  before(async () => {
    await mongoose.connect(mongoUrlString);
    // console.log(`paso por aquí before 1`);
    await clearUserCollection()
  });

  after(async () => {
    await mongoose.connection.collection("users").deleteMany();
    await mongoose.disconnect();
    // console.log(`paso por aquí 4. After`);
  });
  describe('If user data is correct to register new user', () => {
    it("Register New User", async () => {
    const userCreated = await axios.post(`${baseURl}/register`, mocks.user);
    const dataUser = userCreated.data;
    console.log(dataUser);
    assert.ok(ok, "Request Error");
    assert.strictEqual(userCreated.status, 201);
    assert.deepStrictEqual(dataUser, mocks.userAfterRegister);
  });
  })
  describe("if user credentials are correct to login", async () => {
    before(async () => {
      // console.log(`pasó por aquí before 2`);
      await clearUserCollection()
      await axios.post(`${baseURl}/register`, mocks.user);
    })


    it("User Login succesfully", async () => {
      const request = await axios.post(
        `${baseURl}/login`,
        mocks.userCredentials
      );
      const data = request.data;
      // console.log(`paso por aquí 3. testing IT`);
      assert.ok(ok, 'error request')
      assert.strictEqual(request.status, 200)
      assert.deepStrictEqual(data, mocks.userAfterLogin)
      const headers = request.headers;
      // console.log(headers['set-cookie']);
    });
  });
});

async function clearUserCollection() {
  try {
    await mongoose.connection.collection('users').deleteMany()
    console.log(`collection deleted`);
  } catch (error) {
    console.log(`can't delete documents ${error.message}`);
  }
}
