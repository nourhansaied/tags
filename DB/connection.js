import mongoose from 'mongoose';



const initConnection = () => {
    mongoose
      .connect(process.env.connectionURL)
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => console.log("error", err));

}



export default initConnection;