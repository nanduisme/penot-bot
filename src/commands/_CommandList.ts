import { Command } from "../interfaces/Command";
import { help } from "./help";
import { leavegames } from "./leavegames";
import { math } from "./math";
import { ping } from "./ping";
import { rps } from "./rockPaperScissors";
import { xo } from "./xo";

export const CommandList: Command[] = [math, rps, ping, leavegames, xo, help];
