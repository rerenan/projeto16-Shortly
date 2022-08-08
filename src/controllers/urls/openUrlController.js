import { urlRepository } from "../../repositories/urlRepository.js";

const openUrlController = async (req, res) =>{
    const {shortUrl} = req.params;
    try {
        const {rows: url} = await urlRepository.getUrlByShortUrl(shortUrl);

        if(url.length === 0) return res.sendStatus(404);

        await urlRepository.updateUrlViews(Number(url[0].visitCount)+1, shortUrl);
        
        res.redirect(url[0].url);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default openUrlController;