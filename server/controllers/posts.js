import Post from "../models/Post.js";
import User from "../models/User.js";
import path,{dirname} from 'path'
import { fileURLToPath } from "url";


export const createPost = async(req,res) => {
    try {
        // получаем данніе с фронта о посте
        const {title,text} = req.body
        // делаем запрос на бєк что б найти юзера которій создает пост
        const user = await User.findById(req.userId)
        // если в запросе на бекенд есть что то в файлах(например:картинка)
        if(req.files) {
           let fileName = Date.now().toString() + req.files.image.name
           const __dirname = dirname(fileURLToPath(import.meta.url))
           req.files.image.mv(path.join(__dirname,'..','uploads',fileName));
           const newPostWithImage = new Post({
             username: user.username,
             title,
             text,
             imgUrl: fileName,
             views,
             author: req.userId,
           });
           await newPostWithImage.save()
           await User.findByIdAndUpdate(req.userId, {
             $push: { posts: newPostWithImage },
           });
           return res.json(newPostWithImage);
        }
        const newPostWithoutImage = new Post({
          username: user.username,
          title,
          text,
          imgUrl: fileName,
          views,
          author: req.userId,
        });
        await newPostWithImage.save();
        await User.findByIdAndUpdate(req.userId, {
          $push: { posts: newPostWithoutImage },
        });
        return res.json(newPostWithoutImage);
    } catch (error) {
        res.json({
            message:'Ошибка при создании поста'
        })
    }
}
