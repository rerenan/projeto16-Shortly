import { urlRepository } from "../../repositories/urlRepository.js";

const getByIdUrlController = async (req, res) =>{
    const {id} = req.params;
    const {rows: urlFound} = await urlRepository.getUrlById(id);

    if(urlFound.length === 0) return res.sendStatus(404);

    delete urlFound[0].userId;

    res.status(200).send(urlFound[0]);
    try {
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default getByIdUrlController;