'use strict';

// Initialize game variables
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Cache jQuery selectors for better performance
const $message = $('.message');
const $score = $('.score');
const $number = $('.number');
const $guess = $('.guess');
const $check = $('.check');
const $again = $('.again');
const $body = $('body');
const $highScore = $('.highscore');  // Ensure your HTML has an element with class 'highscore'

// Utility function to display messages
function displayMessage(message) {
    $message.text(message);
}

// Function to update the score display
function updateScore(newScore) {
    $score.text(newScore);
}

// Function to reset the game to its initial state
function resetGame() {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    displayMessage('Start guessing...');
    updateScore(score);
    $number.text('?');
    $guess.val(''); // Use .val() to set the value of input fields

    // Reset styles using jQuery's .css() method
    $body.css('background-color', '#222');
    $number.css('width', '15rem');

    // Re-enable the check button in case it was disabled after game over
    $check.prop('disabled', false);
}

// Event listener for the "Check" button
$check.on('click', function () {
    const guess = Number($guess.val());
    console.log(guess, typeof guess);

    // Input Validation: Check if the input is a number between 1 and 20
    if (!guess) {
        displayMessage("⛔️ No Number");
    } else if (guess < 1 || guess > 20) {
        displayMessage("⚠️ Enter a number between 1 and 20");
    } else if (!Number.isInteger(guess)) {
        displayMessage("⚠️ Please enter an integer");
    } else if (guess === secretNumber) {
        // Player wins
        displayMessage('🎉 Correct Number!');
        $number.text(secretNumber);

        // Update styles using jQuery's .css() method
        $body.css('background-color', '#60b347');
        $number.css('width', '30rem');

        // Update high score if current score is higher
        if (score > highScore) {
            highScore = score;
            $highScore.text(highScore);  // Update the high score display
        }

        // Disable the check button to prevent further guesses
        $check.prop('disabled', true);
    } else {
        // Wrong guess
        if (score > 1) {
            // Provide feedback whether the guess is too high or too low
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score--; // Corrected the typo from 'screen--' to 'score--'
            updateScore(score);
        } else {
            // Player loses the game
            displayMessage("💥 You lost the game!");
            updateScore(0);

            // Optionally, reveal the secret number
            $number.text(secretNumber);

            // Update styles to indicate game over
            $body.css('background-color', '#8B0000'); // Dark red color
            $number.css('width', '30rem');

            // Disable the check button to prevent further guesses
            $check.prop('disabled', true);
        }
    }
});

// Event listener for the "Again" button to reset the game
$again.on('click', function () {
    resetGame();  // Reset game state and styles
});
