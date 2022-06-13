import { Command } from "../interfaces/Command";
import { leavegames } from "./leavegames";
import { lubbastats } from "./lubbastats";
import { math } from "./math";
import { ping } from "./ping";
import { rps } from "./rockPaperScissors";
import { xo } from "./xo";

export const CommandList: Command[] = [
    math,
    rps,
    ping, 
    leavegames, 
    xo,
    lubbastats
];
