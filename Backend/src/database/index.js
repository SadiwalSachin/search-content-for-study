import mongoose from "mongoose"

const dbConnection = async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log("Db has successfully connected")
    } catch (error) {
        console.log("Db connection failed")
        console.log(error)
    }
}

export default dbConnection