const express = require("express");

const router = express.Router();
const { check, body } = require("express-validator");
const impersonate = require("~/controllers/user/impersonate");
const login = require("~/controllers/user/login");
const signup = require("~/controllers/user/signup");
const resetPassword = require("~/controllers/user/reset-password");
const forgotPassword = require("~/controllers/user/forgot-password");
const resetPasswordWithToken = require("~/controllers/user/reset-password-with-token");
const refreshToken = require("~/controllers/user/refresh-token");
const token2fa = require("~/controllers/user/token2fa");
const jwkController = require("~/controllers/jwk");

router.post(
  "/login",
  [body("email").not().isEmpty(), body("password").not().isEmpty()],
  login
);

router.post(
  "/impersonate",
  [body("token").not().isEmpty(), body("id").not().isEmpty()],
  impersonate
);

router.post(
  "/forgot-password",
  [body("email").not().isEmpty()],
  forgotPassword
);

router.post(
  "/reset-password-with-token",
  [
    body("token").not().isEmpty(),
    body("new_password_confirmation").not().isEmpty(),
    body("new_password").not().isEmpty(),
    check("new_password", "new_password_confirmation")
      .exists()
      .withMessage("Votre mot de passe doit ne doit pas être vide")
      .isLength({ min: 8 })
      .withMessage("Votre mot de passe doit être de 8 caractères minimum")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
      )
      .withMessage(
        "Votre mot de passe doit contenir contenir au moins 1 chiffre et un caractère spécial"
      ),
    body("new_password", "new_password_confirmation").custom(
      (value, { req }) => {
        if (value !== req.body.new_password_confirmation) {
          // trow error if passwords do not match
          throw new Error("Les mots de passe ne sont pas égaux");
        } else {
          return value;
        }
      }
    ),
  ],
  resetPasswordWithToken
);

router.post(
  "/reset-password",
  [
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
    body("new_password_confirmation").not().isEmpty(),
    body("new_password").not().isEmpty(),
    check("new_password", "new_password_confirmation")
      .exists()
      .withMessage("Votre mot de passe doit ne doit pas être vide")
      .isLength({ min: 8 })
      .withMessage("Votre mot de passe doit être de 8 caractères minimum")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
      )
      .withMessage(
        "Votre mot de passe doit contenir contenir au moins 1 chiffre et un caractère spécial"
      ),
    body("new_password", "new_password_confirmation").custom(
      (value, { req }) => {
        if (value !== req.body.new_password_confirmation) {
          // trow error if passwords do not match
          throw new Error("Les mots de passe ne sont pas égaux");
        } else {
          return value;
        }
      }
    ),
  ],
  resetPassword
);

router.post(
  "/signup",
  [
    body("user.email", "Votre email ne doit pas être vide").not().isEmpty(),
    check("user.email", "Votre email doit être valide").isEmail(),
    check(
      "user.password",
      "Votre mot de passe doit être de 8 caractères minimum"
    ).isLength({
      min: 8,
    }),
    check("user.password")
      .exists()
      .withMessage("Votre mot de passe doit ne doit pas être vide")
      .isLength({ min: 8 })
      .withMessage("Votre mot de passe doit être de 8 caractères minimum")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
      )
      .withMessage(
        "Votre mot de passe doit contenir contenir au moins 1 chiffre et un caractère spécial"
      ),
  ],
  signup
);

router.post("/refresh-token", refreshToken);

router.post("/token2fa", token2fa);

router.get("/jwks", jwkController.getJwks);

module.exports = router;
