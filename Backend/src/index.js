import app from "./app.js";
import deleteNotesAfter3Days from "./cronJobs.js";
import dbConnection from "./database/index.js";
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 8989


dbConnection()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error)
        process.exit(1)
    })

    app.listen(port,()=>{
        console.log(`APP is runing on the port ${port}`)
    })

    deleteNotesAfter3Days()

})
.catch(()=>{
    console.log("Db connection failed at index file")
})

