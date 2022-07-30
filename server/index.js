import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from "./routes/post.js";

const app = express()
dotenv.config();


// Constant 
const PORT = process.env.PORT || 1234
const MONGO_LOGIN = process.env.MONGO_LOGIN;
const MONGO_PASS = process.env.MONGO_PASS || 1234;

// Middlewaew-добавляет или расширяет настройки приложения
app.use(cors())
// приложение понимает что из фронтенда приходят данные в формате json
app.use(express.json())


// routes

// регистрация,логин 
app.use("/api/auth", authRoute);

// для постов
app.use("/api/posts", postRoute);


const start =  async () => {
    try {
        await mongoose.connect(
          `mongodb+srv://${MONGO_LOGIN}:${MONGO_PASS}@cluster0.vpnoqoi.mongodb.net/mern-blog?retryWrites=true&w=majority`
        );
        console.log('Connect mongo')
        app.listen(PORT, () => console.log("server run"));
    } catch (error) {
        console.log(error)
    }
}

start()