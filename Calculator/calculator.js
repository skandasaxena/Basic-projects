function appendToDisplay(value) {
    const display = document.getElementById('display');
    
    if (value === '.' && display.value.includes('.')) {
        return;
    }
    display.value += value;
}
function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function clearLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}
document.addEventListener('keydown', function(event) {
    const display = document.getElementById('display');
    const validKeys = '0123456789/*-+.';
    
    if (validKeys.includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        clearLast();
    }
});
