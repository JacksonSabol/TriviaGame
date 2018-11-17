// Array of questions
// Change to nested arrays of questions and answers with the index location of the correct answer listed at the fifth index
// This will allow me to have different locations for the correct answer when generating the question/answers later
var questionsArray = [
    ["How old is our solar system?", "10,000 years old", "4.6 billion years old", "4.6 million years old", "13.6 billion years old", "2"], // Correct answer at index 2
    ["How far away is the Earth from the Sun?", "93 billion miles", "238,900 miles", "33.9 million miles", "93 million miles", "4"], // Correct answer at index 4
    ["How many planets are in our solar system?", "8 planets", "9 planets", "10 planets", "7 planets", "1"], // Correct answer at index 1
    ["What is the name of the star at the center of our closest, neighboring solar system?", "Polaris", "Betelgeuse", "Proxima Centauri", "Rigel", "3"], // Correct answer at index 3
    ["What is the brightest star in the night sky?", "Arcturus", "Canopus", "Altair", "Sirius", "4"], // Correct answer at index 4
    ["How long does it take Mercury to complete one revolution around our Sun?", "165 years", "88 days", "225 days", "687 days", "2"], // Correct index at index 2
    ["What is the largest planet, in terms of volume, in our solar system?", "Saturn", "Neptune", "Jupiter", "Uranus", "3"], // Correct index at index 3
    ["What are the names of the 2 moons orbitting Mars?", "Phobos and Deimos", "Pheobe and Deimos", "Phobos and Io", "Pheobe and Dione", "1"], // Correct index at index 1
    ["How many principal rings does Neptune have?", "0", "3", "1", "5", "4"], // Correct answer at index 4
    ["Which one of Jupiter's moons has liquid water?", "Io", "Callisto", "Europa", "Elara", "3"] // Correct answer at index 3
];

// Assign tracking variables
var questionIndex;
var correctAnswerIndex;
var decrement;
var timer;
var correct = 0;
var incorrect = 0;

// Testing to see if this resolves event listener issues on dynamically created elements for submitAnswer function - it didn't
// $(document).ready(function () {

    // Set listener for the click of the 'Begin Game' button to execute the beginGame function
    $(".begin-game").on("click", beginGame);

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
            // Put some space below the button
            var spacer = "<br><br>";
            // Append the newly created h tags, button, and text to the #start div box
            $("#start").append(endText, endQuote, correctHFour, incorrectHFour, playAgain, spacer);
        }
        // Set else condition to create a new question with choices
        else {
            // Empty the #questions div to clear placeholder text currently in HTML
            $("#questions").empty();
            // Empty the #choices div to clear placeholder text currently in HTML
            $("#choices").empty();
            // Assign question variable to store result of incrementing index of the questions array - all of the questions are at index 0 of the nested arrays
            var question = questionsArray[questionIndex][0];
            // Append question to the #question div
            $("#question").html("<h3>" + question + "</h3>");

            // Iterate through the nested arrays of the questionsArray, limiting the loop to indices that aren't the question or the correctAnswerIndex, to generate choices for the player
            for (var i = 1; i < (questionsArray[questionIndex].length - 1); i++) {
                // Creating a div to hold the buttons
                var buttonDiv = $("<div id='button-holder" + i + "'>");

                // Storing the choices data
                var answers = questionsArray[questionIndex][i];

                // Creating a button tag to have the choices displayed on - add 'onclick="submitAnswer(i)"' to see if I can pull that value
                var buttonTag = $("<button>").attr({ "class": "choice-button", "onclick": "submitAnswer(" + i + ")", "value": i }).text(answers);

                // Appending the button tag to the new div
                buttonDiv.append(buttonTag);

                // Put some space below the buttons
                var spacerTwo = "<br>";

                // Appending the entire div to the HTML
                $("#choices").append(buttonDiv, spacerTwo);
            };

            // Set decrement variable to 15 (seconds) for each question
            decrement = 15;
            // Assign the setInterval for the countdown function so it decrements 'decrement' every 1 second
            timer = setInterval(countdown, 1000);
            // Display time remaining for each question in the #time-remaining div
            $("#time-remaining").html("<h3>Time Remaining: <strong>" + decrement + "</strong></h3>"); // this may be redundant and cause problems but we'll see
        }
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

    // Event handler for user clicking a button-choice button i.e. making a choice on the DOM - this isn't working
    $(document).on("click", ".button-choice", submitAnswer);

    function submitAnswer(value) {
        // Preventing the button from trying to submit a form - this probably isn't necessary
        // event.preventDefault();

        // Storing the 'value' of the button clicked
        var submittedValue = parseInt(value);
        // Console log for debugging - returns undefined
        console.log(submittedValue);
        // Make sure 'value' is an integer, not a string, for comparison to the correctAnswerIndex
        // submittedValue = parseInt(submittedValue);
        // Console log for testing - returns NaN
        // console.log(submittedValue);
        // Assign the correctAnswerIndex to each, question-respective value - the index of the correct answer is always stored in the index 5 position of each nested array
        correctAnswerIndex = questionsArray[questionIndex][5];
        // Make sure this value is also an integer for comparison
        correctAnswerIndex = parseInt(correctAnswerIndex);
        // Clear the interval to stop running the countdown function
        clearInterval(timer);

        // Set conditions for correctly versus incorrectly answered questions
        if (submittedValue == correctAnswerIndex) {
            // Player answered correctly, increment the number answered correctly by 1
            correct++;
            // Empty the #time-remaining div
            $("#time-remaining").empty();
            // Empty the #questions div
            $("#questions").empty();
            // Empty the #choices div
            $("#choices").empty();
            // Tell player they got it right
            $("#question-over").text("CORRECT! ");
            // Call displayAnswer function to automatically move to next question after 4 seconds
            displayAnswer();
        }
        else {
            // Player answered incorrectly, increment the number answered incorrectly by 1
            incorrect++;
            // Empty the #time-remaining div
            $("#time-remaining").empty();
            // Empty the #questions div
            $("#questions").empty();
            // Empty the #choices div
            $("#choices").empty();
            // Tell player they got it wrong
            $("#question-over").text("WRONG! ");
            // Call displayAnswer function to automatically move to next question after 4 seconds
            displayAnswer();
        }

    }

    // Function to display the correct answer
    function displayAnswer() {
        // Clear the #time-remaining div for when this function is called from a correct choice - I may just make a separate function for this to stop the timer like in the demo as opposed to clearing it
        $("#time-remaining").empty();
        // Reassign the correctAnswerIndex variable to be equal to the correct answer for the corresponding question - the index location inside of each nested array indicating the index location of the correct answer is always at index 5
        correctAnswerIndex = questionsArray[questionIndex][5];
        // Convert to an integer to use as an index
        correctAnswerIndex = parseInt(correctAnswerIndex);
        // Assign a variable to the text of the correct answer using the correct answer index in the respective nested array
        var correctAnswerText = questionsArray[questionIndex][correctAnswerIndex];
        // Assign a variable to create an h2 tag highlighting the correct answer
        var correctAnswerDisplayed = $("<h2>").text("The correct answer was: " + correctAnswerText);
        // Append the h2 tags and correct answer to the #start div
        $("#start").append(correctAnswerDisplayed);
        // Increase the question index by 1 to move on to the next element (question) in the questions and answers arrays
        questionIndex++;
        // Automatically move to the next question after 4 seconds
        setTimeout(newQuestion, 4000);
    }
// });