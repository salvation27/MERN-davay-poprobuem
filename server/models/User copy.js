import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    reqiares:true,
    unique:true
  }
},
{timestamps}
)

export default mongoose.model("User", UserSchema);