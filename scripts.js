const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

let score = 0;

const all_genres = [
    {
        id: 16,
        name: "Board Games",
    },
    {
        id: 17,
        name: "Science & Nature",
    },
    {
        id: 18,
        name: "Computers",
    },
    {
        id: 22,
        name: "Geography",
    },
    {
        id: 23,
        name: "History",
    },
    {
        id: 20,
        name: "Mythology",
    },
    {
        id: 24,
        name: "Politics",
    },
    {
        id: 19,
        name: "Mathematics",
    },
    {
        id: 9,
        name: "General Knowledge",
    },
    {
        id: 10,
        name: "Books",
    },
    {
        id: 14,
        name: "Television",
    },
    {
        id: 21,
        name: "Sports",
    },
    {
        id: 12,
        name: "EMusic",
    },
    {
        id: 11,
        name: "Film",
    },
    {
        id: 13,
        name: "Theatre",
    },
    {
        id: 27,
        name: "Animals",
    },
    {
        id: 26,
        name: "Celebrities",
    },
    {
        id: 15,
        name: "Video Games",
    },
    {
        id: 30,
        name: "Gadgets",
    },
    {
        id: 32,
        name: "Cartoons",
    },
    {
        id: 28,
        name: "Vehicles",
    },
    {
        id: 29,
        name: "Comics",
    },
    {
        id: 25,
        name: "Art",
    },
];

const numbers = Array(22).fill().map((_, index) => index + 1);
numbers.sort(() => 22*Math.random() - 0.5);
const indicies = numbers.slice(0, 4);

console.log(numbers, indicies);

var genres = [];
indicies.forEach(i => genres.push(all_genres[i]));

const levels = ["easy", "medium", "hard"];

function addGenre(genre) {
    const column = document.createElement("div");
    column.classList.add("genre-column");
    column.innerHTML = genre.name;
    game.append(column);

    levels.forEach((level) => {
        const card = document.createElement("div");
        card.classList.add("card", "not-answered");
        column.append(card);

        if (level === "easy") {
            card.innerHTML = 100;
        }
        if (level === "medium") {
            card.innerHTML = 200;
        }
        if (level === "hard") {
            card.innerHTML = 300;
        }

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then((response) => response.json())
            .then((data) => {
                card.setAttribute("data-question", data.results[0].question);
                card.setAttribute("data-answer", data.results[0].correct_answer);
                card.setAttribute("data-value", card.innerHTML);
            })
            .then((done) => card.addEventListener("click", flipCard));
    });
}

genres.forEach((genre) => addGenre(genre));

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
    allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
    const cardOfButton = this.parentElement;
    if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute("data-value"));
        scoreDisplay.innerHTML = score;
        cardOfButton.classList.add("correct-answer");
        cardOfButton.removeChild(cardOfButton.lastChild);
        cardOfButton.removeChild(cardOfButton.lastChild);
    } else {
        cardOfButton.classList.add("wrong-answer");
        cardOfButton.removeChild(cardOfButton.lastChild);
        cardOfButton.removeChild(cardOfButton.lastChild);
    }

    cardOfButton.classList.remove("not-answered");
    const allCards = Array.from(document.querySelectorAll(".not-answered"));
    allCards.forEach((card) => card.addEventListener("click", flipCard));
}