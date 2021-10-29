const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;

const genres = [
    {
        id: 11,
        name: "Film"
    },
    {
        id: 10,
        name: "Books"
    },
    {
        id: 12,
        name: "Music"
    },
    {
        id: 14,
        name: "TV"
    }
];

const levels = ["easy", "medium", "hard"];

function addGenre(genre) {
    const column = document.createElement("div");
    column.classList.add("genre-column");
    column.innerHTML = genre.name;
    game.append(column);

    levels.forEach(level => {
        const card = document.createElement("div");
        card.classList.add("card", "not-answered");
        column.append(card);

        if (level === "easy"){
            card.innerHTML = 100;
        }
        if (level === "medium"){
            card.innerHTML = 200;
        }
        if (level === "hard"){
            card.innerHTML = 300;
        }

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
        .then(response => response.json())
        .then(data => {
            card.setAttribute("data-question", data.results[0].question);
            card.setAttribute("data-answer", data.results[0].correct_answer);
            card.setAttribute("data-value", card.innerHTML);
        })
        .then(done => card.addEventListener("click", flipCard));
    })
}

genres.forEach(genre => addGenre(genre));

function flipCard() {
    this.style.fontSize = "15px";
    this.innerHTML = "<br />";
    const textDisplay = document.createElement("div");
    const trueButton = document.createElement("button");
    const falseButton = document.createElement("button");
    trueButton.innerHTML = "True";
    falseButton.innerHTML = "False";
    trueButton.addEventListener("click", getResult);
    falseButton.addEventListener("click", getResult);
    textDisplay.innerHTML = this.getAttribute("data-question");
    this.append(textDisplay, trueButton, falseButton);

    const allCards = Array.from(document.querySelectorAll(".card"));
    allCards.forEach (card => card.removeEventListener("click", flipCard));
}

function getResult() {


    const cardOfButton = this.parentElement
    if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute("data-value"));
        scoreDisplay.innerHTML = score;
        cardOfButton.classList.add("correct-answer")
        cardOfButton.removeChild(cardOfButton.lastChild);
        cardOfButton.removeChild(cardOfButton.lastChild);
    } else {
        cardOfButton.classList.add("wrong-answer")
        cardOfButton.removeChild(cardOfButton.lastChild);
        cardOfButton.removeChild(cardOfButton.lastChild);
    }

    cardOfButton.classList.remove("not-answered");
    const allCards = Array.from(document.querySelectorAll(".not-answered"));
    allCards.forEach (card => card.addEventListener("click", flipCard));
}