import { connection } from "../../database.js";

const getByIdUrlController = async (req, res) =>{
    const {id} = req.params;
    const {rows: urlFound} = await connection.query(
        `
            SELECT id, "shortUrl", url
            FROM urls
            WHERE id = $1
        `,
        [id]
    );
    if(urlFound.length === 0) return res.sendStatus(404);

    res.status(200).send(urlFound[0])
    try {
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export default getByIdUrlController;