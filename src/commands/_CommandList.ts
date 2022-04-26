import { Command } from "../interfaces/Command";
import { button } from "./buttonTest";
import { hello } from "./hello";
import { sum } from "./sum";

export const CommandList: Command[] = [hello, sum, button];
