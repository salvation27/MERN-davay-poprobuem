import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Comment from "../models/Comment.js";

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.img.name; // img переменная с фронта
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.img.mv(path.join(__dirname, "..", "uploads", fileName)); // img переменная с фронта

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json({
        message: "Посто создан с картинкой",
        newPostWithImage,
      });
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });
    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
    return res.json({
      message: "Пост создан без картинки",
      newPostWithoutImage,
    });
  } catch (error) {
    res.json({ message: "Пост не создан,ошибка" });
  }
};

export const getPosts = async (req, res) => {
  try {
    // находим все пості и сортируем по дате создания
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");
    if (!posts) {
      return res.json({
        message: "Нет постов",
      });
    }
    res.json({
      // message: "Посты загружены с сервера",
      posts,
      popularPosts,
    });
  } catch (error) {
    res.json({
      message: "Ошибка при получении постов",
    });
  }
};

export const getPostsById = async (req, res) => {
  try {
    // ищем пост и увеличиваем просмотр
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Ошибка при получении постов" });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.json({ message: "Ошибка при удалении поста" });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    res.json({
      message: "Пост удален",
    });
  } catch (error) {
    res.json({ message: "Ошибка при удалении поста" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    // console.log(title, text, id); +
    const post = await Post.findById(id);
    // console.log('post',post);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.img.name; // img переменная с фронта
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.img.mv(path.join(__dirname, "..", "uploads", fileName)); // img переменная с фронта
      post.imgUrl = fileName || "";
    }
    post.title = title;
    post.text = text;
    await post.save();
    res.json({
      post,
      message: "Пост обновлён",
    });
  } catch (error) {
    res.json({
      message: "Ошибка при обновлении поста",
    });
  }
};



export const getPostComments = async(req,res) => {
  try {
    const post = await Post.findById(req.params.id)
    const list = await Promise.all(
      post.comments.map(comment=>{
        return Comment.findById(comment);
      })
    )
    res.json(list)
  } catch (error) {
    res.json({ message: "Ошибка при получении комментариев" });
  }
}