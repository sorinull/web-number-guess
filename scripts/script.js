/* ===== variables ===== */
// form elements
const 	inputForm		= document.getElementById('input-form');
const 	inputGuess 		= document.getElementById('input-guess');
const 	submitBtn 		= document.getElementById('submit-button');
const 	outputContainer = document.getElementById('output-container');
const 	prevGuesses 	= document.getElementById('prev-guesses');
const 	outputMessage 	= document.getElementById('output-message');
let 	resetBtn;		// new 'Reset Game' button added at runtime
// other variables
let randomNumber;		// the random generated number
let guessCount = 1;		// guess counter
const guessCountMax = 10;

/* ===== init ===== */
bindControls();
focusOnInputCtrl();
initValues();

/* ===== functions ===== */
function bindControls()
{
	// binds the submit button click to the checkGuess method
	submitBtn.addEventListener("click", checkGuess);
	// binds the form submission to the submit button click
	inputForm.addEventListener("submit", function()
	{
		event.preventDefault();
		submitBtn.click(); 
	}, false);
	// binds the input field to the submit button click when the Enter key is pressed
	/*
	* disabled this functionality due to it triggering when pressing the enter/return key 
	* while the Reset Game button was highlighted - maybe something to do with its focus()?
	* ... too lazy to debug further, for now.
	*/
	/* inputGuess.addEventListener("keyup", function(event)
	{ 
		if (event.keyCode === 13) // enter/return key code
		{
			event.preventDefault();
			submitBtn.click();
		}
	}); */
}

function initValues()
{
	generateRandomNumber();
	guessCount = 1;
	prevGuesses.textContent = 'Previous guesses: ';
	outputMessage.textContent = '-';
}

function generateRandomNumber()
{
	// assigns the variable a value between 1 and 100
	randomNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess()
{
	let userGuess = Number(inputGuess.value);
	
	// checks if user input is a (valid) number
	if (! Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100)
	{
		alert('Guess must be a number between 1-100!');
		focusOnInputCtrl();
		return;
	}

	// reveals the output elements at the start of the game
	if (guessCount === 1)
	{
		outputContainer.classList.remove('hidden');
	}

	prevGuesses.textContent += userGuess + ' ';	// adds the guessed number to the info message	
	
	// checks if the user guess is correct
	if (userGuess === randomNumber)
	{
		outputMessage.textContent = 'Congratulations! You guessed right!';
		outputMessage.classList.remove('warning');	/* if class doesn't exist, it will not throw an error */
		outputMessage.classList.add('success');     /* if class already exists, it will not add it again */
		gameOver();
	}
	else
	{
		// checks if the user has any guesses left
		if (guessCount < guessCountMax)
		{
			// compares the user guess with the random number and informs the user
			if (userGuess < randomNumber)
			{
				outputMessage.textContent = 'Nope. Your guess was too low!';
			}
			else
			{
				outputMessage.textContent = 'Wrong. Your guess was too high!';
			}
			
			focusOnInputCtrl();
		}
		else
		{
			outputMessage.textContent = 'GAME OVER! The correct number was ' + randomNumber + '.';
			gameOver();
		}
		
		guessCount++;
	}
}

// focuses the cursor on the user input control after it clears its value
function focusOnInputCtrl()
{
	inputGuess.value = '';
	inputGuess.focus();
}

function gameOver()
{
	outputMessage.classList.add('game-over');	/* if class already exists, it will not add it again */
	disableInputElements(true);
	addResetButton();
}

// loops through the input container and disables or enables all of its child elements
function disableInputElements(disable = true)
{
	var elements = inputForm.elements;
	for (var i = 0; i < elements.length; i++)
		elements[i].disabled = disable;
}

// creates a reset button for the game and adds it to the page
function addResetButton()
{
	resetBtn = document.createElement("button");
	resetBtn.innerHTML = 'Reset Game';
	resetBtn.addEventListener("click", resetGame);
	// appends the button to the end of the body element
	document.getElementsByTagName("body")[0].appendChild(resetBtn);
	
	resetBtn.focus();
}

function resetGame()
{
	initValues();
	
	inputForm.reset();	// resets the input form controls to their original values
	disableInputElements(false); // enables the input elements
	focusOnInputCtrl();

	outputContainer.classList.add('hidden');	// hides the output elements before the game starts
	outputMessage.classList.remove('success');		/* if class doesn't exist, it will not throw an error */
	outputMessage.classList.add('warning');			/* if class already exists, it will not add it again */
	outputMessage.classList.remove('game-over');	/* if class doesn't exist, it will not throw an error */
		
	resetBtn.parentNode.removeChild(resetBtn);	// removes the game reset button from the page
}