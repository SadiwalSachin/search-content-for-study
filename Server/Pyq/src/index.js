import { app } from "./app.js";
import dbConnection from "./db/dbConfig.js";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
dotenv.config();

const numCPUs = os.cpus().length;

// console.log("length of cpus is", numCPUs);

if (cluster.isMaster) {
  // console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function (worker, code, signal) {
    // console.log(`Worker died. Starting a new one...`);
    cluster.fork();
  });
} else {
  dbConnection()
    .then((response) => {
      // console.log(response);
      app.listen(4000, () => {
        console.log("PYQ Server is running on port 4000");
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error);
      process.exit(1);
    });
}
