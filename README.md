# Welcome to a Cosmology Trivia Game!

## The following project is Cosmology-themed, timed trivia game

### Overview

I employed HTML, CSS, JavaScript, and jQuery to make a timed trivia game with the same name. The point of this exercise was to use JavaScript and jQuery logic to generate trivia questions to be answered sequentially within a set amount of time. The player has 15 seconds to answer each question by clicking on the answer to move on to the next, for a total of 10 questions. The game logic relies on the setTimeout and setInterval functions of JavaScript to create deadlines for answering questions, and to move to the next question automatically. 

### Gameplay:

* A cosmology-based question will appear on the screen when the player clicks start.

   * The player will have 15 seconds to choose from 4 options to answer the trivia question.

   * When the player clicks on an answer, the game will alert them whether they answered the question correctly or incorrectly. 

     * 4 seconds after answering the question, the next question will appear automatically and the player will have another 15 seconds to answer that one.

   * The player continues through this process for 10 total questions.

   * At the completion of the game, the player will be shown their results (correctly/incorrectly answered questions).

   * The player will be given the option to play again after completing a full game by clicking a restart button.

 I employed the use of jQuery to create dynamically generated elements that display on the page without changing the hard-coded HTML. I outputted the elements to a Bootstrap Jumbotron-style div container to act as the User Interface for the game. The code snippet below shows how to set a timer for what's on the page, as well as display new trivia questions that call a function to alert the player upon clicking. This function will tell the player whether they answered correctly or incorrectly:

 ``` javascript
var question = questionsArray[questionIndex][0];
        $("#question").html("<h3>" + question + "</h3>");
        for (var i = 1; i < (questionsArray[questionIndex].length - 1); i++) {
            var buttonDiv = $("<div id='button-holder" + i + "'>");
            var answers = questionsArray[questionIndex][i];
            var buttonTag = $("<button>").attr({ "class": "choice-button", "onclick": "submitAnswer(" + i + ")", "value": i }).text(answers);
            buttonDiv.append(buttonTag);
            var spacerTwo = "<br>";

            $("#choices").append(buttonDiv, spacerTwo);
        };
        decrement = 15;
        timer = setInterval(countdown, 1000);
        $("#time-remaining").html("<h3>Time Remaining: <strong>" + decrement + "</strong></h3>");
 ```
### Feel free to play around with the game by clicking on the 'Begin Game' button to begin a new game!

[Link to my Game](https://jacksonsabol.github.io/TriviaGame/)

Thank you for reading!

### Built With:
* HTML
* CSS
* JavaScript
* jQuery Library
* Bootstrap CSS Library

