// Array of questions
var questionsArray = [
    "How old is our solar system?", // 1
    "How far away is the Earth from the Sun?", // 2
    "How many planets are in our solar system?", // 3
    "What is the name of the star at the center of our closest, neighboring solar system?", // 4
    "What is the brightest star in the night sky?", // 5
    "How long does it take Mercury to complete one revolution around our Sun?", // 6
    "What is the largest planet, in terms of volume, in our solar system?", // 7
    "What are the names of the 2 moons orbitting Mars?", // 8
    "How many principal rings does Neptune have?", // 9
    "Which one of Jupiter's moons has liquid water?" //10
];

// Array of answers
var answersArray {
    questionOne: {
        correctAnswer: "4.6 billion years old",
        incorrectAnswers: ["10,000 years old", "4.6 million years old", "13.6 billion years old"]
      },
    questionTwo: {
        correctAnswer: "93 million miles",
        incorrectAnswers: ["93 billion miles", "238,900 miles", "33.9 million miles"]
    },
    questionThree: {
        correctAnswer: "8 planets",
        incorrectAnswers: ["9 planets", "10 planets", "7 planets"]
    },
    questionFour: {
        correctAnswer: "Proxima Centauri",
        incorrectAnswers: ["Polaris", "Betelgeuse", "Rigel"]
    },
    questionFive: {
        correctAnswer: "Sirius",
        incorrectAnswers: ["Arcturus", "Canopus", "Altair"]
    },
    questionSix: {
        correctAnswer: "88 days",
        incorrectAnswers: ["165 years", "225 days", "687 days"]
    },
    questionSeven: {
        correctAnswer: "Jupiter",
        incorrectAnswers: ["Saturn", "Neptune", "Uranus"]
    },
    questionEight: {
        correctAnswer: "Phobos and Deimos",
        incorrectAnswers: ["Pheobe and Deimos", "Phobos and Io", "Pheobe and Dione"]
    },
    questionNine: {
        correctAnswer: "5",
        incorrectAnswers: ["0", "3", "1"]
    },
    questionTen: {
        correctAnswer: "Europa",
        incorrectAnswers: ["Io", "Callisto", "Elara"]
    }
};

// Assign tracking variables
var questionIndex;
var correctAnswerId;
var decrement;
var timer;
var correct = 0;
var incorrect = 0;

// Set listener for the click of the 'Begin Game' button to execute the beginGame function
$("button").on("click", beginGame);

// Function for the start of a new game
function beginGame() {
	// Reset the question index to the first question (index 0)
	questionIndex = 0;
	// Reset number of correctly/incorrectly answered questions to 0
	correct = 0;
	incorrect = 0;
	// Clear the start box containing the instructions and 'Begin Game' button
	$("#start").empty();
	// Call the function for a new question
	newQuestion();
}

function newQuestion() {
    //
}