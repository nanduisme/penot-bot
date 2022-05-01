import { getUserData } from "./getUserData";

export const setGame = async (userId: string, game: "rps"|"null"|"xo") => {
    let user = await getUserData(userId);
    user.currentGame = game;
    await user.save();
    return user;
};

