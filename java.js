

const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById("game");
const restartButton = document.getElementById('restart');
startButton.addEventListener("click", startGame);

let firstCard = null;
let secondCard = null;
let match = 0;
let cardCounter = 0;
let click = 1;

function startGame() {
    firstCard = null;
    secondCard = null;
    match = 0;
    cardCounter = 0;
    gameContainer.style.display = "block";
    gameContainer.innerHTML = "";
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    startButton.style.display = "none";
}
startButton.addEventListener("click", function () {
    startGame();
    restartButton.style.display = "block";
})
restartButton.addEventListener("click", function () {
    restartF();
    startButton.style.display = "block";
})

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    const flipped = event.target;
    click++;
    const clickCount = document.getElementById('click');
    clickCount.textContent = `Score Count: ${click}`;

    if (flipped === firstCard || flipped === secondCard || flipped.style.backgroundColor) {
        return;
    }
    flipped.style.backgroundColor = flipped.classList[0];

    if (!firstCard) {
        firstCard = flipped;
    } else {
        secondCard = flipped;
        cardCounter = 0;
        if (firstCard.classList[0] === secondCard.classList[0]) {
            firstCard.removeEventListener("click", handleCardClick);
            secondCard.removeEventListener("click", handleCardClick);
            firstCard = null;
            secondCard = null;
        } else {
            setTimeout(function () {
                firstCard.style.backgroundColor = "";
                secondCard.style.backgroundColor = "";
                firstCard = null;
                secondCard = null;
            }, 100);
        }
    }

    function restartF() {
        firstCard = null;
        secondCard = null;
        match = 0;
        cardCounter = 0;
        gameContainer.innerHTML = "";
        startButton.style.display = "block";
        clickCount.style.display = "block";
        clickCount.textContent = ``;
        restart.style.display = "none";
    }
    restartButton.addEventListener("click", restartF)
    document.getElementById('restart').addEventListener("click", function () {
        click = 0;
        document.getElementById('restartButton').textContent = '';
    });

}




// when the DOM loads
createDivsForColors(shuffledColors);
