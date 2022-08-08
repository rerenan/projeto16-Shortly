import { connection } from "../database.js";

async function addUrl(userId, url, shortUrl) {
    return connection.query(
        `
            INSERT INTO urls ("userId", url, "shortUrl")
            VALUES ($1, $2, $3)
        `,
        [userId, url, shortUrl]
    );
};

async function deleteUrl(id) {
    return connection.query(
        `
            DELETE *
            FROM urls
            WHERE id = $1
        `,
        [id]
    );
};

async function getUserUrls(id) {
    return connection.query(
        `
        SELECT id, "shortUrl", url, "visitCount"
        FROM urls
        WHERE "userId" = $1
        `,
        [id]
    );
};

async function getUrlById(id) {
    return connection.query(
        `
            SELECT id, "userId", "shortUrl", url
            FROM urls
            WHERE id = $1
        `,
        [id]
    );
};

async function getUrlByShortUrl(shortUrl) {
    return connection.query(
        `
            SELECT * 
            FROM urls 
            WHERE "shortUrl" = $1 
        `,
        [shortUrl]
    );
};
async function updateUrlViews(views ,shortUrl) {
    return connection.query(
        `
            UPDATE urls 
            SET "visitCount" = $1 
            WHERE "shortUrl" = $2
        `,
        [views, shortUrl]
    );
};

export const urlRepository = {
    addUrl,
    deleteUrl,
    getUrlById,
    getUrlByShortUrl,
    updateUrlViews,
    getUserUrls
};