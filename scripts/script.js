/* ===== variables ===== */
// form elements
const inputContainer = document.getElementById('input-container');
const inputGuess = document.getElementById('input-guess');
const submitBtn = document.getElementById('submit-button');
const outputContainer = document.getElementById('output-container');
const prevGuesses = document.getElementById('prev-guesses');
const outputMessage = document.getElementById('output-message');
let resetBtn;	// new button added at runtime
// other variables
let randomNumber;
let guessCount = 1;
const guessCountMax = 10;

/* ===== init ===== */
submitBtn.addEventListener("click", checkGuess);
initValues();

/* ===== functions ===== */
function initValues()
{
	generateRandomNumber();
	guessCount = 1;
	prevGuesses.textContent = 'Previous guesses: ';
	outputMessage.textContent = '-';
}

function generateRandomNumber()
{
	randomNumber = Math.floor(Math.random() * 100) + 1;
}

function checkGuess()
{
	let userGuess = Number(inputGuess.value);
	
	if (! Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100)
	{
		alert('Guess must be a number between 1-100!');
		inputGuess.value = '';
		inputGuess.focus();
		return;
	}

	if (guessCount === 1)
	{
		outputContainer.classList.remove('hidden');
	}

	prevGuesses.textContent += userGuess + ' ';
	
	if (userGuess === randomNumber)
	{
		outputMessage.textContent = 'Congratulations! You guessed right!';
		outputMessage.classList.remove('warning');
		outputMessage.classList.add('success');
		gameOver();
	}
	else
	{
		guessCount++;

		if (guessCount <= guessCountMax)
		{
			if (userGuess < randomNumber)
			{
				outputMessage.textContent = 'Nope. Your guess was too low!';
			}
			else
			{
				outputMessage.textContent = 'Wrong. Your guess was too high!';
			}
			
			inputGuess.value = '';
			inputGuess.focus();
		}
		else
		{
			outputMessage.textContent = 'GAME OVER! The correct number was ' + randomNumber + '.';
			gameOver();
		}
	}
}

function gameOver()
{
	toggleElementsDisabled();
	addResetButton();
}

function toggleElementsDisabled()
{
	var elements = inputContainer.elements;
	for (var i = 0; i < elements.length; i++)
		elements[i].disabled = elements[i].disabled ? false : true;
}

function addResetButton()
{
	resetBtn = document.createElement("button");
	resetBtn.innerHTML = 'Reset Game';
	resetBtn.addEventListener("click", resetGame);
	
	document.getElementsByTagName("body")[0].appendChild(resetBtn);
}

function resetGame()
{
	initValues();
	
	inputContainer.reset();
	toggleElementsDisabled();

	outputContainer.classList.add('hidden');
	outputMessage.classList.remove('success');
	outputMessage.classList.add('warning');
		
	resetBtn.parentNode.removeChild(resetBtn);
}