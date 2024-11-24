import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async() => {
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('MONGO connected');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
          dbName: "pen-test",
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        })
    
        isConnected = true;
    
        console.log('MongoDB connected')
      } catch (error) {
        console.log(error);
      }
    }