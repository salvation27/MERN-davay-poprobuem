import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // есть ли такой пользователь
    // ищет в базе монго пользователя с таким именем
    const isUsed = await User.findOne({ username });
    // если есть возвращаем сообщение что занято имя
    if (isUsed) {
      return res.json({ message: "Имя уже занято ,создайте другое" });
    }
    // для шифрования пароля 10-єто сложность
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // создаем класс нового юзера
    const newUser = new User({
      username,
      password: hash,
    });
// создаем токен
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
    // записываем пользователя в базу
    await newUser.save();
    // возвращаем ответ если пользовтель записан
    res.json({
      message: "пользователь создан",
      newUser,
      token
    });
  } catch (error) {
    res.json({
      messages: "ошибка при создании пользователя",
    });
  }
};

// login user
export const login = async (req, res) => {
  try {
    // вітаскиваем переданніе с фронта данніе
    const { username, password } = req.body;
    // находим в базе юзера по имени
    const user = await User.findOne({ username });
    // если нет юзера   сервер дает сообщение
    if (!user) {
      return res.json({
        messages: "Такого пользователя нет в базе",
      });
    }
    // проверяем совпадает ли пароль с введеннім
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.json({
        messages: "Пароль не верній ",
      });
    }

    // создаем токен, нужен для авторизации
    // шифруем айдишник юзера
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // возвращаем с бекенда на фронтенд найденного пользователя,токен и сообщение
    res.json({
      token,
      user,
      message: "Вы вошли в систему",
    });
  } catch (error) {
    res.json({
      messages: "Ошибка при авторизации",
    });
  }
};

// getMe user

export const getMe = async (req, res) => {
  try {
    // ищем юзера
    const user = await User.findById(req.userId);
    if (!user) {
     return res.json({
        messages: "Юзера не существует",
      });
    }
     const token = jwt.sign(
       {
         id: user._id,
       },
       process.env.JWT_SECRET,
       { expiresIn: "30d" }
     )

     res.json({
       user,token
     });
  } catch (error) {
    res.json({
      messages: "Нет доступа",
    });
  }
};
