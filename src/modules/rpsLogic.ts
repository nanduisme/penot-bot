/* Logic for one round of rock paper scissors
    input: 
        1 - rock
        2 - paper
        3 - scissors
    output:
        1 - win
        2 - lose
        3 - tie
*/

export const botChoice = (): number => { 
    const random = Math.floor(Math.random() * 3) + 1;
    return random;
}

export const rpsLogic = (input: number, botInput: number) => {
    let result = 0

    if (input === botInput) {
        result = 3;
    } else if (input === 1) {
        if (botInput === 2) {
            result = 2;
        } else if (botInput === 3) {
            result = 1;
        }
    } else if (input === 2) {
        if (botInput === 1) {
            result = 1;
        } else if (botInput === 3) {
            result = 2;
        }
    } else if (input === 3) {
        if (botInput === 1) {
            result = 2;
        } else if (botInput === 2) {
            result = 1;
        }
    }
    
    return result;
}

export const rpsStringToInt = (input: string) => { 
    let result = 0;

    switch (input) {
        case "rock":
            result = 1;
            break;
        case "paper":
            result = 2;
            break;
        case "scissors":
            result = 3;
            break;
    }

    return result;
}

export const rpsIntTotString = (input: number) => { 
    let result = "";

    switch (input) {
        case 1:
            result = "rock";
            break;
        case 2:
            result = "paper";
            break;
        case 3:
            result = "scissors";
            break;
    }

    return result;
}