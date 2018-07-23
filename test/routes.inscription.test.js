process.env.NODE_ENV = "test";

const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
const passportStub = require("passport-stub");

const server = require("../app");
const knex = require("../db/knex");

chai.use(chaiHttp);
passportStub.install(server);

describe("routes : inscription", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe("GET /api/v1/inscription/tis", () => {
    const expected = [
      { id: 1, nom: "ti arras", region: "Hauts-de-France" },
      { id: 2, nom: "ti paris", region: "Île-de-France" }
    ];
    it("should return list of tis by region", () =>
      chai
        .request(server)
        .get("/api/v1/inscription/tis")
        .then((res, req) => {
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.length.should.eql(2);
          res.body.should.deep.eql(expected);
        }));
  });

  describe.only("create user", () => {
    it("should fail when pass1!==pass2", () =>
      chai
        .request(server)
        .post("/api/v1/inscription/mandataires")
        .send({
          username: "toto",
          etablissement: "",
          email: "",
          type: "sss",
          pass1: "kikoo",
          pass2: "lol",
          adresse: "",
          code_postal: "",
          ville: "",
          telephone: "",
          latitude: 2,
          longitude: 2
        })
        .then((res, req) => {
          throw new Error("should not succeed");
        })
        .catch(res => {
          res.status.should.eql(500);
        }));

    it("should fail when empty username", () =>
      chai
        .request(server)
        .post("/api/v1/inscription/mandataires")
        .send({
          username: "",
          etablissement: "",
          email: "",
          type: "sss",
          pass1: "kikoo",
          pass2: "kikoo",
          adresse: "",
          code_postal: "",
          ville: "",
          telephone: "",
          latitude: 2,
          longitude: 2
        })
        .then((res, req) => {
          throw new Error("should not succeed");
        })
        .catch(res => {
          res.status.should.eql(500);
        }));

    it("should succeed when pass1===pass2", () =>
      chai
        .request(server)
        .post("/api/v1/inscription/mandataires")
        .send({
          username: "toto",
          etablissement: "",
          email: "",
          type: "sss",
          pass1: "kikoo",
          pass2: "kikoo",
          adresse: "",
          code_postal: "",
          ville: "",
          telephone: "",
          latitude: 2,
          longitude: 2
        })
        .then((res, req) => {
          res.status.should.eql(200);
        })
        .catch(res => {
          console.log(res);
          throw new Error("should not fail");
        }));

    it("should add mandataire tis", () =>
      chai
        .request(server)
        .post("/api/v1/inscription/mandataires")
        .send({
          username: "testeur",
          etablissement: "",
          email: "",
          type: "sss",
          pass1: "kikoo",
          pass2: "kikoo",
          tis: [1, 2],
          adresse: "rue du test",
          code_postal: "",
          ville: "",
          telephone: "",
          latitude: 2,
          longitude: 2
        })
        .then((res, req) => {
          res.status.should.eql(200);
        })
        .then(async (res, req) => {
          const user = await knex
            .table("users")
            .orderBy("id", "desc")
            .first();
          user.username.should.equal("testeur");
          const mandataire = await knex
            .table("mandataires")
            .orderBy("id", "desc")
            .first();
          mandataire.adresse.should.equal("rue du test");
          const tis = await knex
            .table("mandataire_tis")
            .where("mandataire_id", mandataire.id);
          tis.length.should.equal(2);
          const ti_ids = tis.map(t => t.ti_id);
          ti_ids.sort();
          ti_ids.should.deep.equal([1, 2]);
        })
        .catch(res => {
          console.log(res);
          throw new Error("should not fail");
        }));
  });
});
