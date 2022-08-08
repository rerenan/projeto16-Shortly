import { connection } from "../../database.js";

const getRankingController = async (req, res) =>{
try {
    const {rows: ranking} = await connection.query(
        `
        SELECT 
	        users.id,
	        users.name, 
            COUNT(urls.id) as "linksCount",
	        SUM(urls."visitCount") as "visitCount"
        FROM users
        JOIN urls
        ON urls."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
        `
    );
    res.status(200).send(ranking);
} catch (e) {
    console.log(e);
    res.sendStatus(500);
}
}

export default getRankingController;