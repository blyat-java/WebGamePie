document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('calculateButton')!;
    const piValue = document.getElementById('piValue')!;

    button.addEventListener('click', () => {
        const pi = calculatePi(1000000); // Calculate Pi to 1,000,000 terms
        piValue.textContent = `Pi Value: ${pi}`;
    });
});

function calculatePi(iterations: number): number {
    let pi = 0;
    let divisor = 1;

    for (let i = 0; i < iterations; i++) {
        if (i % 2 === 0) {
            pi += 4 / divisor;
        } else {
            pi -= 4 / divisor;
        }
        divisor += 2;
    }

    return pi;
}
