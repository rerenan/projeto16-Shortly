import bcrypt from "bcrypt";

import { connection } from "../../database.js";
import { signUpUserSchema } from "../../utils/userSchemas.js";

const signUpController = async (req, res) => {
const {name, email, password, confirmPassword} = req.body;
try {
    const {error} = signUpUserSchema.validate(req.body, {abortEarly: false});

    if(error) return res.status(422).send(error.message);
    

    const {rows: alreadyExists} = await connection.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    if(alreadyExists.length) return res.sendStatus(409);

    const hashedPassword = await bcrypt.hash(password,10)

    await connection.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );

    res.sendStatus(201);
} catch (e) {
    console.log(e);
    res.sendStatus(500);
}
    
};

export default signUpController;