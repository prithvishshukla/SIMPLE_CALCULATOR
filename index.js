document.addEventListener('DOMContentLoaded', function () {
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelector('.buttons');

    let currentInput = '0';
    let operator = '';
    let previousInput = '';
    let shouldResetDisplay = false;

    updateDisplay();

    buttons.addEventListener('click', function (e) {
        const button = e.target;
        if (!button.matches('button')) return; // Ignore clicks on the container
        const value = button.textContent;

        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('decimal')) {
            handleDecimal();
        } else if (button.classList.contains('clear')) {
            clearCalculator();
        } else if (button.classList.contains('equals')) {
            calculateResult();
        }
    });

    function handleNumber(num) {
        if (shouldResetDisplay || currentInput === '0') {
            currentInput = '';
            shouldResetDisplay = false;
        }
        // Limit input length to prevent overflow
        if (currentInput.length > 15) return;
        
        currentInput += num;
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput === '' && op === '-') {
            currentInput = '-';
            updateDisplay();
            return;
        }
        if (currentInput === '' || currentInput === '-') return;

        if (previousInput !== '' && !shouldResetDisplay) {
            calculateResult();
        }

        operator = op;
        previousInput = currentInput;
        shouldResetDisplay = true;
    }

    function handleDecimal() {
        if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function clearCalculator() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        shouldResetDisplay = false;
        updateDisplay();
    }

    function calculateResult() {
        if (previousInput === '' || operator === '' || shouldResetDisplay) return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    displayError();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        // Format result to a reasonable precision
        currentInput = parseFloat(result.toPrecision(15)).toString();
        operator = '';
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay();
    }

    function displayError() {
        currentInput = 'Error';
        updateDisplay();
        previousInput = '';
        operator = '';
        shouldResetDisplay = true;
    }

    function updateDisplay() {
        resultDisplay.value = currentInput;
    }
});