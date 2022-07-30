// єто middleware.проверка нашего токена

import jwt from 'jsonwebtoken'

export const checkAuth = (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    if(token) {
        try {
            // расшифровуем токин
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id
            next()
        } catch (error) {
           return res.json({
            message:'Нет доступа'
           }) 
        }
    } else {
       return res.json({
         message: "Нет доступа2",
       });  
    }
}