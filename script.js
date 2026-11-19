let isRunning = true;

const ctx = document.getElementById('twinChart').getContext('2d');
const twinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [],
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                tension: 0.3
            },
            {
                label: 'Pressure (PSI)',
                data: [],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true, max: 110 }
        }
    }
});

function toggleMachine() {
    isRunning = !isRunning;
    const statusText = document.getElementById('machine-status');
    const toggleBtn = document.getElementById('toggle-btn');

    if (isRunning) {
        statusText.innerText = 'ON';
        statusText.className = 'status-on';
        toggleBtn.innerText = 'Stop Machine';
    } else {
        statusText.innerText = 'OFF';
        statusText.className = 'status-off';
        toggleBtn.innerText = 'Start Machine';
        document.getElementById('temp-val').innerText = '28 °C';
        document.getElementById('speed-val').innerText = '0 RPM';
        document.getElementById('pressure-val').innerText = '0 PSI';
        document.getElementById('health-val').innerText = 'Idle';
        document.getElementById('alert-box').classList.add('hidden');
    }
}

setInterval(() => {
    if (!isRunning) return;

    const temp = Math.floor(Math.random() * (92 - 40 + 1)) + 40;
    const speed = Math.floor(Math.random() * (2400 - 1300 + 1)) + 1300;
    const pressure = Math.floor(Math.random() * (60 - 25 + 1)) + 25;

    document.getElementById('temp-val').innerText = `${temp} °C`;
    document.getElementById('speed-val').innerText = `${speed} RPM`;
    document.getElementById('pressure-val').innerText = `${pressure} PSI`;

    const alertBox = document.getElementById('alert-box');
    const healthVal = document.getElementById('health-val');

    if (temp > 80 || pressure > 50) {
        alertBox.classList.remove('hidden');
        alertBox.innerText = `⚠️ ALERT: High ${temp > 80 ? 'Temperature (' + temp + '°C)' : 'Pressure (' + pressure + ' PSI)'} Detected!`;
        healthVal.innerText = 'Warning!';
        healthVal.style.color = '#ef4444';
    } else {
        alertBox.classList.add('hidden');
        healthVal.innerText = 'Normal';
        healthVal.style.color = '#22c55e';
    }

    const now = new Date().toLocaleTimeString();
    if (twinChart.data.labels.length > 10) {
        twinChart.data.labels.shift();
        twinChart.data.datasets[0].data.shift();
        twinChart.data.datasets[1].data.shift();
    }
    twinChart.data.labels.push(now);
    twinChart.data.datasets[0].data.push(temp);
    twinChart.data.datasets[1].data.push(pressure);
    twinChart.update();

}, 2000);
