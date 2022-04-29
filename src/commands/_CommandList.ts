import { Command } from "../interfaces/Command";
import { leavegames } from "./leavegames";
import { math } from "./math";
import { ping } from "./ping";
import { rps } from "./rockPaperScissors";

export const CommandList: Command[] = [math, rps, ping, leavegames];
