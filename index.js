document.addEventListener('DOMContentLoaded', async () => {
    const pyodide = await loadPyodide();
    const button = document.getElementById('runGameButton')!;
    const gameOutput = document.getElementById('gameOutput')!;

    button.addEventListener('click', async () => {
        const pythonCode = `
import random

def number_guessing_game():
    number_to_guess = random.randint(1, 100)
    guess = None
    attempts = 0
    while guess != number_to_guess:
        guess = int(input("Guess a number between 1 and 100: "))
        attempts += 1
        if guess < number_to_guess:
            print("Too low!")
        elif guess > number_to_guess:
            print("Too high!")
    print(f"Congratulations! You've guessed the number in {attempts} attempts.")

number_guessing_game()
        `;

        pyodide.runPythonAsync(`
from js import document
import sys
from io import StringIO

class OutputCatcher:
    def __init__(self):
        self.output = StringIO()
    
    def write(self, msg):
        self.output.write(msg)
    
    def flush(self):
        pass

sys.stdout = OutputCatcher()
sys.stderr = OutputCatcher()

${pythonCode}

output = sys.stdout.output.getvalue() + sys.stderr.output.getvalue()
document.getElementById("gameOutput").textContent = output
        `);
    });
});
