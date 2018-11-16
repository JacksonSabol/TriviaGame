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
var answersArray = {
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

// Function to determine if the game is over or to display the next question
function newQuestion() {
    // Clear the start box if it contains the previous question
    $("#start").empty();

    // Set conditional to end the game for when all the questions have been completed
    if (questionIndex === questionsArray.length) {
        // Empty the #time-remaining div
        $("#time-remaining").empty();
        // Empty the #questions div
        $("#questions").empty();
        // Empty the #choices div
        $("#choices").empty();

        // Assign a variable to create an h2 tag with the end-of-game text
        var endText = $("<h2>").text("Your Trivia Trials Are Complete!'");
        // Assign a variable to create an h3 tag with a mildly relevant Carl Sagan quote
        var endQuote = $("<h3>").text("'Somewhere, something incredible is waiting to be known.'");
        // Assign a variable to create an h4 tag to display how many questions were answered correctly
        var correctHFour = $("<h4>").text("You got " + correct + " questions right");
        // Assign a variable to create an h4 tag to display how many questions were answered incorrectly
        var incorrectHFour = $("<h4>").text("You got " + incorrect + " questions wrong");
        // Assign a variable to create a button with the same class of .begin-game to retain the start buttons amazing styling, and the text of 'Play again?'
        var playAgain = $("<button>").attr("class", "begin-game").text("Play again?");
        // Append the newly created h tags, button, and text to the #start div box
        $("#start").append(endText, endQuote, correctHFour, incorrectHFour, playAgain);
    }
    // Set else condition to create a new question with choices
    else {
        // Assign question variable to store result of incrementing index of the questions array
        var question = questionsArray[questionIndex];
        // Console log for testing
        console.log(question);
        // Append question to the #question div
        $("#question").html("<h3>" + question + "</h3>");

        // Concatenate the correct answer with the incorrect answers and assign it to a variable to be appended to the HTML 
        var answers = answersArray[questionIndex].correctAnswer + answersArray[questionIndex].incorrectAnswers[0] + answersArray[questionIndex].incorrectAnswers[1] + answersArray[questionIndex].incorrectAnswers[2];
        // Console log for testing
        console.log(answers);
        // Append all the possible choices to the #choices div
        $("#choices").append("<h3>" + answers + "</h3><br>");

        // Future problems:
        // I need to assign each choice a unique value so I know which answer was chosen
        // This is going to display the correct answer in the first position every time, which isn't ideal

    };
    // Set decrement variable to 15 (seconds) for each question
    decrement = 15;
    // Assign the setInterval for the countdown function so it decrements 'decrement' every 1 second
    timer = setInterval(countdown, 1000);
    // Display time remaining for each question in the #time-remaining div
    $("#time-remaining").html("<h3>Time Remaining: <strong>" + decrement + "</strong></h3>"); // this may be redundant and cause problems but we'll see
    // Console log for testing
    console.log(decrement);
}

// Function set a time limit of 15 seconds on each question
function countdown() {
    // Decrement the counting variable 'decrement'
    decrement--;
    // Display the time remaining in the #time-remaining div
    $("#time-remaining").html("<h3>Time Remaining: <strong>" + decrement + "</strong></h3>");
    // If 'decrement' is 0, the time is up
    if (decrement === 0) {
        // Assign a variable to create an h2 tag with the time's up text
        var timeText = $("<h2>").text("Your Time Is Up!");
        // Assign a variable to create an h3 tag with a mildly relevant Carl Sagan quote
        var timeQuote = $("<h3>").text("'We make our world significant by the courage of our questions and the depth of our answers'");
        // Append the newly created h tags to the #start div box
        $("#start").append(timeText, timeQuote);
        // Clear the interval to stop running the countdown function
        clearInterval(timer);
        // Clear the question from the #question div
        $("#question").empty();
        // Clear the choices from the #choices div
        $("#choices").empty();
        // Increase the number of questions answered incorrectly by 1
        incorrect++;
        // Call function to display the answer
        displayAnswer();
    }
}

// Function to display the correct answer
function displayAnswer() {
    // Clear the #time-remaining div for when this function is called from a correct choice - I may just make a separate function for this to stop the timer like in the demo as opposed to clearing it
    $("#time-remaining").empty();
    // Reassign the correctAnswerId variable to be equal to the correct answer for the corresponding question
    correctAnswerId = answersArray[questionIndex].correctAnswer;
    // Assign a variable to create an h2 tag highlighting the correct answer
    var correctAnswerDisplayed = $("<h2>").text("The correct answer was: " + correctAnswerId);
    // Append the h2 tags and correct answer to the #start div
    $("#start").append(correctAnswerDisplayed);
    // Increase the question index by 1 to move on to the next element (question) in the questions and answers arrays
    questionIndex++;
    // Automatically move to the next question after 4 seconds
    setTimeout(newQuestion, 4000);
};
