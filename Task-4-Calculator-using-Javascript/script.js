// Select display and buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Variable to store the current input
let currentInput = "";

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.id === "clear") {
            // Clear the display
            currentInput = "";
            updateDisplay("0");
        } else if (button.id === "equal") {
            try {
                // Evaluate the expression
                currentInput = eval(currentInput);
                updateDisplay(currentInput);
            } catch (error) {
                updateDisplay("Error");
                currentInput = "";
            }
        } else {
            // Append the clicked button's value
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});
