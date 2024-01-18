
import { Schema, model } from "mongoose";


const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minLength: [3, "name is too short"],
  },
  email: {
    type: String,
      required: true,
    unique:true
    },
    password: {
        type: String,
        required: true,
        minLength:[7,"password is too short"]
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength:[7,"password is too short"]
    },
}, {
    timestamps:true
});


const userModel = model("User", userSchema);


export default userModel;