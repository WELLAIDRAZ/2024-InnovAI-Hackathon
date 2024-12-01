import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/",{
            // dbName: 'Qwaze_database',
            dbName: 'IPHA',
            retryWrites: true,
            w: 'majority',
            serverSelectionTimeoutMS: 30000,  // Increase server selection timeout
            socketTimeoutMS: 45000,           // Increase socket timeout
        });
        console.log("Connected to database!")
    }catch(error){
        console.log("error",error)
    }
};
