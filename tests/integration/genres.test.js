const request = require("supertest");
const { Genre } = require("../../models/genres");
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
  });
});
