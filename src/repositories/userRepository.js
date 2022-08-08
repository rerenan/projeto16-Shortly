import { connection } from "../database.js";

async function addUser(name, email, password) {
    return connection.query(
        `
            INSERT INTO users 
            (name, email, password) 
            VALUES ($1, $2, $3)
        `,
        [name, email, password]
    );
};

async function getUserByEmail(email) {
    return connection.query(
        `
            SELECT * 
            FROM users 
            WHERE email = $1
        `,
        [email]
    );
};

async function getRanking() {
    return connection.query(
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
};
async function getUserUrls(id) {
    return connection.query(
        `
            SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount"
            FROM users
            JOIN urls
            ON  urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id
        `,
        [id]
    );
};

export const userRepository = {
    getUserUrls,
    getRanking,
    getUserByEmail,
    addUser
};
