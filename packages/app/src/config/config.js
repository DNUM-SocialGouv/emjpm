/* eslint-disable autoimport-declarative/autoimport */
import version from "./version";

const { location } = window;
const { hostname } = location;

let GRAPHQL_SERVER_URI;
let API_URL;
if (hostname == "localhost") {
  (GRAPHQL_SERVER_URI = "http://localhost:5000/v1/graphql"),
    (API_URL = "http://127.0.0.1:4000");
} else {
  const { protocol } = location;
  GRAPHQL_SERVER_URI = protocol + "//hasura-" + hostname + "/v1/graphql";
  API_URL = protocol + "//api-" + hostname;
}

const PROD_DOMAIN = "emjpm.pjm.social.gouv.fr";
const EMAIL_SUPPORT = "support@mandoline.atlassian.net";

const isProd = hostname === PROD_DOMAIN;

const config = {
  API_URL,
  GRAPHQL_SERVER_URI,
  NODE_ENV: process.env.NODE_ENV,
  PACKAGE_VERSION: version,
  SENTRY_PUBLIC_DSN: process.env.REACT_APP_SENTRY_PUBLIC_DSN,
  IS_PROD: isProd,
  PROD_DOMAIN,
  EMAIL_SUPPORT,
};
export default config;
