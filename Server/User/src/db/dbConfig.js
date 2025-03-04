import mongoose from "mongoose";

export default async function dbConnection (){
    try{
        console.log(process.env.DB_URI,process.env.DB_NAME);
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        // console.log(connectionInstance);
        console.log("Db has successfully connected")
    } catch (error){
        console.log("Db connection failed")
        console.log(error);
    }
}
