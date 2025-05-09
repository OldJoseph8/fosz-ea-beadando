document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('data-table');
    const chartCanvas = document.getElementById('chartCanvas');
    const ctx = chartCanvas.getContext('2d');
    
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Szám #1', 'Szám #2', 'Szám #3', 'Szám #4', 'Szám #5'],
            datasets: [{
                label: 'Kiválasztott sor',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    table.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            const rowData = Array.from(row.children).map(cell => parseInt(cell.textContent));
            updateChart(rowData);
        });
    });

    function updateChart(data) {
        chart.data.datasets[0].data = data;
        chart.update();
    }
});
