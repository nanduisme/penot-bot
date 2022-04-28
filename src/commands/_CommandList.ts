import { Command } from "../interfaces/Command";
import { button } from "./buttonTest";
import { hello } from "./hello";
import { math } from "./math";
import { rps } from "./rockPaperScissors";

export const CommandList: Command[] = [hello, button, math, rps];
