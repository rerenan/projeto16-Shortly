import { connection } from "../../database.js";

const openUrlController = async (req, res) =>{
    const {shortUrl} = req.params;
    try {
        const {rows: url} = await connection.query(
            `
                SELECT * 
                FROM urls 
                WHERE "shortUrl" = $1 
            `,
            [shortUrl]
        );

        if(url.length === 0) return res.sendStatus(404);
        await connection.query(
            `
            UPDATE urls 
            SET "visitCount" = $1 
            WHERE "shortUrl" = $2
            `,
            [Number(url[0].visitCount)+1, shortUrl]
        );
        
        res.redirect(url[0].url);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default openUrlController;