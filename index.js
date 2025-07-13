// Select all button elements on the page
const buttonsEl = document.querySelectorAll("button");

// Select the input field where the result is displayed
const inputFieldEl = document.getElementById("result");

// Loop through each button and add a click event listener
for (let i = 0; i < buttonsEl.length; i++) {
    buttonsEl[i].addEventListener("click", () => {
        // Get the text content of the clicked button
        const buttonValue = buttonsEl[i].textContent;
        // If 'C' is clicked, clear the input field
        if (buttonValue === "C") {
            clearResult();
        // If '=' is clicked, calculate and display the result
        } else if (buttonValue === "=") {
            calculateResult();
        // If '%' is clicked, handle percentage calculation
        } else if (buttonValue === "%") {
            handlePercentage();
        // For other buttons (numbers/operators), append their value to the input field
        } else {
            appendValue(buttonValue);
        }
    });
}

// Function to clear the input field
function clearResult() {
    inputFieldEl.value = "";
}

// Function to evaluate the expression in the input field and display the result
function calculateResult() {
    inputFieldEl.value = eval(inputFieldEl.value);
}

// Function to append the clicked button's value to the input field
function appendValue(buttonValue) {
    inputFieldEl.value += buttonValue;
    //   inputFieldEl.value = inputFieldEl.value + buttonValue;
}

// Function to handle percentage calculations
function handlePercentage() {
    const currentValue = inputFieldEl.value;
    
    // If input field is empty, do nothing
    if (!currentValue) return;
    
    try {
        // Check if expression contains operators
        if (/[+\-*/]/.test(currentValue)) {
            // Find the last number in the expression
            const parts = currentValue.match(/([+\-*/])([^+\-*/]*)$/);
            if (parts) {
                const operator = parts[1];
                const lastNumber = parts[2];
                const expression = currentValue.substring(0, currentValue.length - lastNumber.length - 1);
                const baseValue = eval(expression);
                const percentage = (baseValue * parseFloat(lastNumber)) / 100;
                
                // Replace the expression with the result of applying the percentage
                if (operator === '+' || operator === '-') {
                    inputFieldEl.value = `${baseValue}${operator}${percentage}`;
                } else {
                    inputFieldEl.value = `${expression}${operator}${percentage}`;
                }
            }
        } else {
            // Convert single number to percentage (divide by 100)
            inputFieldEl.value = parseFloat(currentValue) / 100;
        }
    } catch (error) {
        inputFieldEl.value = "Error";
    }
}
