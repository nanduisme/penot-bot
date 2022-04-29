import { getUserData } from "./getUserData";

export const setGame = async (userId: string, game: "rps"|"null") => {
    let user = await getUserData(userId);
    user.currentGame = game;

    if (game !== "null") {
        user.isInGame = true;
    } else {
        user.isInGame = false;
    }

    await user.save();
    return user;
};

