import UserModel, { UserInt } from "../database/models/UserModel"

export const getUserData = async (id: string): Promise<UserInt> => {
    const userData =
        await UserModel.findOne({ id }) ||
        await UserModel.create({
            discordId: id,
            isInGame: false,
            currentGame: "null",
        });

    return userData;
}
