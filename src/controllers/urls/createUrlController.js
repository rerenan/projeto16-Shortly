import {nanoid} from "nanoid";

import { urlRepository } from "../../repositories/urlRepository.js";

import urlSchema from "../../utils/urlSchema.js";

const createUrlController = async (req, res) =>{
    const {url} = req.body;
    const {userId} = res.locals.user;

    try {
        const {error} = urlSchema.validate(req.body, {abortEarly: false});
        if(error) return res.status(422).send(error.message);
        const shortUrl = nanoid(8);
        
        await urlRepository.addUrl(userId, url, shortUrl);
        
        res.status(201).send({shortUrl});

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default createUrlController;