function resizeInput(input) {
    input.style.width = Math.max((input.value.length + 2) * 14, 50) + "px";
}

function handleInput(e) {
    const input = e.target;
    const value = input.value;
    const nextInput = input.nextElementSibling ? input.nextElementSibling.nextElementSibling : null;

    if (value.endsWith('.')) {
        if (nextInput) {
            nextInput.focus();
        }
        input.value = value.slice(0, -1);
    }

    if (!/^\d*$/.test(value)) {
        input.value = value.replace(/[^0-9]/g, '');
    }

    // Limit the value in the last textbox to a maximum of 43199
    if (input.id === 'part4' && parseInt(input.value) > 43199) {
        input.value = '43199';
    }

    // Limit the third part to 5 digits
    if (input.id === 'part3' && input.value.length > 5) {
        input.value = input.value.slice(0, 5);
    }

    resizeInput(input);
    calculateDate();
}

function handlePaste(e) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const parts = pasteData.split('.');
    for (let i = 0; i < 4; i++) {
        let part = document.getElementById(`part${i+1}`);
        part.value = parts[i] || '';
        resizeInput(part);
    }

    if (parts.length >= 3) {
        calculateDate();
    }
}

function calculateDate() {
    const parts = [
        document.getElementById('part1').value,
        document.getElementById('part2').value,
        document.getElementById('part3').value,
        document.getElementById('part4').value
    ];

    if (!parts[2] && !parts[3]) {
        document.getElementById('output').textContent = '';
        return;
    }

    const baseDate = new Date(2000, 0, 1);
    const days = parseInt(parts[2], 10) || 0;
    const seconds = parseInt(parts[3], 10) * 2 || 0;

    const buildDate = new Date(baseDate.getTime());
    buildDate.setDate(baseDate.getDate() + days);
    buildDate.setSeconds(baseDate.getSeconds() + seconds);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('output').textContent = buildDate.toLocaleString(undefined, options);
}

document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', handleInput);
});
    
