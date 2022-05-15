"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xoWinCheck = void 0;
const xoWinCheck = (xoBoard, player) => {
    // Row Case
    for (let row of xoBoard) {
        if (row.every((val) => val === player)) {
            return player;
        }
    }
    // Column Case
    for (let i = 0; i < 3; i++) {
        let column = [];
        for (let j = 0; j < 3; j++) {
            column.push(xoBoard[j][i]);
        }
        if (column.every((val) => val === player)) {
            return player;
        }
    }
    // Diagonal Case
    let diagonal = [];
    for (let i = 0; i < 3; i++) {
        diagonal.push(xoBoard[i][i]);
    }
    if (diagonal.every((val) => val === player)) {
        return player;
    }
    // Reverse Diagonal Case
    diagonal = [];
    for (let i = 0; i < 3; i++) {
        diagonal.push(xoBoard[i][2 - i]);
    }
    if (diagonal.every((val) => val === player)) {
        return player;
    }
    return 0;
};
exports.xoWinCheck = xoWinCheck;
//# sourceMappingURL=xoLogic.js.map