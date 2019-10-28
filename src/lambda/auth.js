import serverless from "serverless-http";
import app from "./lib/express";

process.on("uncaughtException", err => {
  console.error(`uncaughtException ${err.toString()}`);
});

process.on("unhandledRejection", reason => {
  console.error(`unhandledRejection ${reason}`);
});

exports.handler = serverless(app);
