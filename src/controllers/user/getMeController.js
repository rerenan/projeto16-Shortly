import { connection } from "../../database.js";

const getMeController = async (req, res) =>{
    const {userId} = res.locals.user;
    try {
        const {rows: user} = await connection.query(
        `
        SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount"
        FROM users
        JOIN urls
        ON  urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id
        `,
        [userId]
    );
    if(user.length === 0) return res.sendStatus(404);

    const {rows: userUrls} = await connection.query(
        `
        SELECT id, "shortUrl", url, "visitCount"
        FROM urls
        WHERE "userId" = $1
        `,
        [userId]
    )

    const resultUser = {...user, shortenedUrls: userUrls }

    res.status(200).send(resultUser);
    
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export default getMeController;