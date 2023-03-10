//

const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");

jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { databaseName, knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");
const { seedData } = require("../../database/seed-data");

beforeAll(async () => {
  await seedData(databaseName);
});

beforeEach(async () => {
  nodemailerMock.mock.reset();
});

const defaultRegister = (params) => ({
  mandataire: {
    code_postal: "75010",
    departement_code: "01",
    etablissement: "",
    location_adresse: "",
    telephone: "",
    ville: "",
  },
  user: {
    email: params && params.email != undefined ? params.email : "toto@toto.com",
    nom: params && params.nom != undefined ? params.nom : "testAd",
    password:
      params && params.password != undefined ? params.password : "test123456?",
    passwordConfirmation:
      params && params.passwordConfirmation != undefined
        ? params.passwordConfirmation
        : "test123456?",
    prenom: params && params.prenom != undefined ? params.prenom : "testPrenom",
    type: params && params.type != undefined ? params.type : "individuel",
  },
});

test("should register with good values", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send({ ...defaultRegister(), tis: [22, 37] });
  expect(response.body).toMatchInlineSnapshot(`
    Object {
      "success": true,
    }
  `);
  expect(response.status).toBe(200);

  const lastInsert = await knex("users").orderBy("created_at", "desc").first();
  await knex("mandataires").orderBy("created_at", "desc").first();

  expect(nodemailerMock.mock.sentMail().length).toBe(1);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
  expect(lastInsert).toMatchSnapshot({
    created_at: expect.any(Object),
    password: expect.any(String),
  });
});

test("should NOT register when password!==passwordConfirmation", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(
      defaultRegister({ password: "hello", passwordConfirmation: "world" })
    );

  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Array) },
    `
                    Object {
                      "errors": Any<Array>,
                    }
          `
  );
  expect(response.status).toBe(400);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should NOT register when email already exist", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(defaultRegister());

  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Array) },
    `
                        Object {
                          "errors": Any<Array>,
                        }
            `
  );
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
  expect(response.status).toBe(409);
});

test("should add magistrat", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send({
      ...defaultRegister({
        email: "magistrat@emjpm.fr",
        type: "ti",
      }),
      magistrat: {
        cabinet: "2A",
        ti: 22,
      },
    });

  expect(response.body).toMatchInlineSnapshot(`
    Object {
      "success": true,
    }
  `);
  expect(response.status).toBe(200);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  const user = await knex.table("users").orderBy("created_at", "desc").first();

  expect(user.email).toEqual("magistrat@emjpm.fr");
  const magistrat = await knex
    .table("magistrat")
    .innerJoin("users", "users.id", "magistrat.user_id")
    .where("user_id", user.id)
    .first();
  expect(magistrat.cabinet).toEqual("2A");
  expect(magistrat.ti_id).toEqual(22);
});
