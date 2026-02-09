const minInput = document.getElementById('minValue');
const maxInput = document.getElementById('maxValue');
const drawButton = document.getElementById('drawButton');
const resultOutput = document.getElementById('result');
const messageEl = document.getElementById('message');

	function showMessage(text, variant = 'info') {
		messageEl.textContent = text;
		messageEl.dataset.variant = variant;
	}

function parseInteger(value) {
	if (value === null || value === undefined) return null;
	const trimmed = String(value).trim();
	if (trimmed.length === 0) return null;

	const number = Number(trimmed);
	if (!Number.isFinite(number)) return null;

	return Math.trunc(number);
}

function drawRandomIntegerInclusive(min, max) {
	const span = max - min + 1;
	return Math.floor(Math.random() * span) + min;
}

function handleDraw() {
	const minValue = parseInteger(minInput.value);
	const maxValue = parseInteger(maxInput.value);

	if (minValue === null || maxValue === null) {
		resultOutput.value = '—';
		showMessage('Preencha os dois campos com números inteiros.', 'error');
		return;
	}

	if (minValue > maxValue) {
		resultOutput.value = '—';
		showMessage('O valor "De" precisa ser menor ou igual ao valor "Até".', 'error');
		return;
	}

	const result = drawRandomIntegerInclusive(minValue, maxValue);
	resultOutput.value = String(result);
	showMessage(`Sorteado entre ${minValue} e ${maxValue}.`, 'info');
}

drawButton.addEventListener('click', handleDraw);

[minInput, maxInput].forEach((input) => {
	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') handleDraw();
	});
});
