import { urlRepository } from "../../repositories/urlRepository.js";

const deleteUrlController = async (req, res) =>{
    const {userId} = res.locals.user;
    const {id} = req.params;
    try {
        const {rows: urlToDelete} = await urlRepository.getUrlById(id);

        if(urlToDelete.length === 0) return res.sendStatus(404);
        if(urlToDelete[0].userId !== userId) return res.sendStatus(401);

        await urlRepository.deleteUrl(id);
        
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default deleteUrlController;