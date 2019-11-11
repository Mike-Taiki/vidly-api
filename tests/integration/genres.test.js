const request = require("supertest");
const { Genre } = require("../../models/genres");
const { User } = require("../../models/users");
const mongoose = require("mongoose");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { genre: "genre1" },
        { genre: "genre2" }
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(res.body.length);
    });
  });

  describe("GET /:id", () => {
    it("should return genre by id", async () => {
      const genre = new Genre({ genre: "Comedy" });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(...res.body).toHaveProperty("genre", genre.genre);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get(`/api/genres/1`);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "1234" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      const token = new User().generateAuthToken();

      const name = new Array(52).join("a");

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });
  });
});
