import { configure, skipPreflightChecks } from "@culturehq/client";

switch (process.env.NODE_ENV) { // eslint-disable-line default-case
  case "development":
    configure({
      apiHost: "http://localhost:3000",
      awsAccessKeyId: "access-key-id",
      signerURL: "http://localhost:3001",
      uploadBucket: "http://localhost:3001"
    });

    break;
  case "test":
    configure({
      apiHost: "http://localhost:8080",
      awsAccessKeyId: "access-key-id",
      signerURL: "http://localhost:8081",
      uploadBucket: "http://localhost:8082"
    });

    break;
  case "production":
    skipPreflightChecks();
    break;
}
