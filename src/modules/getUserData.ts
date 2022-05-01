import UserModel, { UserInt } from "../database/models/UserModel";

export const getUserData = async (discordId: string): Promise<UserInt> => {
    const userData =
        await UserModel.findOne({ discordId: discordId }) ||
        await UserModel.create({ discordId: discordId });
    return userData;
};
