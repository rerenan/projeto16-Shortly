import { urlRepository } from "../../repositories/urlRepository.js";
import { userRepository } from "../../repositories/userRepository.js";

const getMeController = async (req, res) => {
    const { userId } = res.locals.user;
    try {
        const { rows: user } = await userRepository.getUserUrls(userId);

        if (user.length === 0) return res.sendStatus(404);

        const { rows: userUrls } = await urlRepository.getUserUrls(userId);
        const resultUser = { ...user[0], shortenedUrls: userUrls };

        res.status(200).send(resultUser);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
};

export default getMeController;