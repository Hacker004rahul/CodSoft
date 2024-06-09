// script.js
document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator');
    const turnOnButton = document.getElementById('turnOn');
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    turnOnButton.addEventListener('click', () => {
        calculator.style.display = 'block';
        calculator.classList.add('calculator-on');
        turnOnButton.classList.add('hidden');
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
                    if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.innerText = '0';
                return;
            }

            if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
                return;
            }

            if (value === '=') {
                if (currentInput === '' || previousInput === '' || operator === '') return;
                currentInput = evaluate(previousInput, currentInput, operator);
                display.innerText = currentInput;
                previousInput = '';
                operator = '';
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '') return;
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                return;
            }

            currentInput += value;
            display.innerText = currentInput;
        });
    });

    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
        }
    }
});
