import mongoose from "mongoose"

const connectDB=async()=>{
    try {
        const dbURL=`${process.env.MONGODB_URL}`
        const connectionInstance=await mongoose.connect(dbURL);
       
        console.log(`\n Connected ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("DBconnection failed",error)
        process.exit(1);
    }
};
export default connectDB