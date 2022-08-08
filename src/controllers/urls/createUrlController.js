import {nanoid} from "nanoid";
import { connection } from "../../database.js";

import urlSchema from "../../utils/urlSchema.js";

const createUrlController = async (req, res) =>{
    const {url} = req.body;
    const {id} = res.locals.user;

    try {
        const {error} = urlSchema.validate(req.body, {abortEarly: false});
        if(error) return res.status(422).send(error.message);
        const shortUrl = nanoid(8);
        
        await connection.query(
            `
                INSERT INTO urls ("userId", url, "shortUrl")
                VALUES ($1, $2, $3)
            `,
            [id, url, shortUrl]
        );
        
        res.status(201).json({shortUrl});

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default createUrlController;