import bcrypt from "bcrypt";
import { connection } from "../../database.js";
import { generateToken } from "../../utils/generateToken.js";
import { signInUserSchema } from "../../utils/userSchemas.js";

const signInController = async (req, res) => {
const {email, password} = req.body;
try {
    const {error} = signInUserSchema.validate(req.body);

    if(error) return res.status(422).send(error.message)
    
    const {rows: user} = await connection.query(
        `SELECT * FROM users WHERE email = $1`,
         [email]
    );
    if(user.length === 0) return res.sendStatus(401);

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if(!isPasswordValid) return res.sendStatus(401);

    res.status(200).send(generateToken({userId: user[0].id, name: user[0].name}));
    
} catch (e) {
    console.log(e);
    res.sendStatus(500);
}
};

export default signInController;