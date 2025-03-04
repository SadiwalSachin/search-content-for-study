import dotenv from "dotenv";
import { app } from "./app.js";
import dbConnection from "./db/dbConfig.js";
import cluster from "cluster";
import os from "os";
dotenv.config()

const PORT = process.env.PORT || 5000;

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function (worker, code, signal) {
    console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });
} else {
  dbConnection()
    .then((response) => {
      console.log("response", response);
      app.listen(PORT, () => {
        console.log(`User server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
      app.on("error", () => {
        console.log("some error happened");
      });
    });
}
