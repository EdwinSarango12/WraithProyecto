import mongoose from 'mongoose'
mongoose.set('strictQuery', true)
const connection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI_LOCAL) 
        console.log("Database conectada")
    } catch (error) {
        console.log(error)
    }
}
export default connection