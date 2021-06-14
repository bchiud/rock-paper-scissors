const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const PLAYER = "PLAYER";
const COMPUTER = "COMPUTER";
const TIE = "TIE";
const ROCK_EMOJI = "x1FAA8";
const PAPER_EMOJI = "x1F4C3";
const SCISSORS_EMOJI = "9988";
const ROUNDS = 5;

let playerScore = 0;
let computerScore = 0;

function onPlayerSelection(playerSelection) {
    if (isGameEnd())
        alert("Game over, press F5 to play again!");
    else {
        console.log(playerSelection);
        playRound(playerSelection);
    }
}

function playRound(playerSelection) {
    computerSelection = computerPlay();

    updateFrontendAction(PLAYER, playerSelection);
    updateFrontendAction(COMPUTER, computerSelection);

    let result = getResult(playerSelection, computerSelection);

    let msg = `${COMPUTER.toTitleCase()} played ${computerSelection.toTitleCase()}. `;

    switch (result) {
        case PLAYER:
            playerScore++;
            updateFrontendScore(PLAYER, playerScore);
            updateFrontendMessage(msg += "You won.")
            break;
        case COMPUTER:
            computerScore++;
            updateFrontendScore(COMPUTER, computerScore);
            updateFrontendMessage(msg += "You lost.")
            break;
        default:
            updateFrontendMessage(msg += "Tied.")
            break;
    }
}

function getResult(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();

    if (playerSelection == computerSelection) {
        return TIE;
    } else if (
        (playerSelection == ROCK && computerSelection == SCISSORS) ||
        (playerSelection == PAPER && computerSelection == ROCK) ||
        (playerSelection == SCISSORS && computerSelection == PAPER)
    ) {
        return PLAYER;
    } else {
        return COMPUTER;
    }
}

function isGameEnd() {
    return playerScore == ROUNDS || computerScore == ROUNDS;
}

function randAction() {
    let options = [ROCK, PAPER, SCISSORS];
    return options[Math.floor(Math.random() * options.length)];
}

function computerPlay() {
    return randAction();
}

String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function updateFrontendAction(name, action) {
    if (action.toUpperCase() == ROCK) {
        emoji = ROCK_EMOJI;
    } else if (action.toUpperCase() == PAPER) {
        emoji = PAPER_EMOJI;
    } else {
        emoji = SCISSORS_EMOJI;
    }

    itemId = name.toLowerCase() + "-action";
    let elem = document.getElementById(itemId);
    console.log(itemId + ": " + String.fromCodePoint("0" + emoji))
    elem.innerText = String.fromCodePoint("0" + emoji);
}

function updateFrontendScore(name, score) {
    itemId = name.toLowerCase() + "-score";
    let elem = document.getElementById(itemId);
    elem.innerText = score;
}

function updateFrontendMessage(msg) {
    document.getElementById("message-text").innerText = msg;
}