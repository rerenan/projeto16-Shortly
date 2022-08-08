import jwt from "jsonwebtoken";

const validateUser = async (req, res, next) =>{
    const {authorization} = req.headers;
    if(!authorization) return res.sendStatus(401);

    const token = authorization.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = user.user;

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    next();
};

export default validateUser;