import mongoose from "mongoose";

const UserChema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   ссілка на другую схему
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Post'
    },
  ],
},
{timestamps:true}
);

export default mongoose.model('User',UserChema);
