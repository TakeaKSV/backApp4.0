import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoURL = 'mongodb+srv://takea:cesitron@cluster0.giagssh.mongodb.net/proyectoMich';
    try {
        await mongoose.connect(mongoURL);
        console.log('Conectao canijo');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;