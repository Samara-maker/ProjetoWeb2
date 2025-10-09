const picker = document.getElementById('datePicker');
const dot = document.getElementById('dateDot');
const text = document.getElementById('dateText');

let day = 19;
let month = 6;
let year = 2024;

let isDragging = false;
let startAngle = 0;
let lastAngle = 0;
let totalRotation = 0;

function updateText() {
    const d = day.toString().padStart(2, '0');
    const m = month.toString().padStart(2, '0');
    text.textContent = `${d}/${m}/${year}`;
}

function getAngle(e) {
    const rect = picker.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
}

dot.addEventListener('mousedown', (e) => {
    isDragging = true;
    startAngle = getAngle(e);
    lastAngle = startAngle;
    e.preventDefault();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const angle = getAngle(e);
    let delta = angle - lastAngle;

    // Corrigir rotação invertida (de +180 para -180 e vice-versa)
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    totalRotation += delta;
    lastAngle = angle;

    // Atualiza ano a cada 360°
    if (totalRotation >= 360) {
        year++;
        totalRotation -= 360;
    } else if (totalRotation <= -360) {
        year--;
        totalRotation += 360;
    }

    // Atualiza dia e mês baseado no ângulo atual
    const normalizedAngle = (angle + 360) % 360;
    day = Math.floor(normalizedAngle / 12) + 1;
    if (day > 31) day = 31;

    month = Math.floor(normalizedAngle / 30) % 12 + 1;

    // Atualiza posição visual da bolinha
    const rect = picker.getBoundingClientRect();
    const radius = rect.width / 2;
    const rad = (normalizedAngle - 90) * (Math.PI / 180);
    dot.style.left = `${radius + radius * Math.cos(rad)}px`;
    dot.style.top = `${radius + radius * Math.sin(rad)}px`;

    updateText();
});

updateText();

// PARTE DO TELEFONE

 document.addEventListener('DOMContentLoaded', () => {
      const slider = document.getElementById('telefoneSlider');
      const display = document.getElementById('telefoneDisplay');

      slider.addEventListener('input', () => {
        // valor do slider com 9 dígitos
        let valor = slider.value.toString().padStart(9, '0');

        // adiciona o dígito 9 na frente (números atuais no Brasil)
        valor = '9' + valor;

        // separa os blocos
        const parte1 = valor.substring(0, 5); // 9 + 4 dígitos
        const parte2 = valor.substring(5, 9); // últimos 4

        // exibe no formato (69) 9XXXX-XXXX
        display.textContent = `Phone: (69) ${parte1}-${parte2}`;
      });
    });