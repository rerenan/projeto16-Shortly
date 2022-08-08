import { userRepository } from "../../repositories/userRepository.js";

const getRankingController = async (req, res) => {
    try {
        const { rows: ranking } = await userRepository.getRanking();
        res.status(200).send(ranking);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
};

export default getRankingController;