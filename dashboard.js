// Construction data models
const projects = [
    { name: "Highway Bridge Expansion", progress: 68, status: "on-track", location: "Zone A" },
    { name: "Metro Line Extension", progress: 42, status: "delayed", location: "Zone B" },
    { name: "Commercial Tower Foundation", progress: 89, status: "on-track", location: "Zone C" },
    { name: "Underground Utility Tunnel", progress: 23, status: "critical", location: "Zone D" }
];

const equipment = [
    { name: "Excavator CAT 336", status: "operational", hours: 1240, utilization: 78 },
    { name: "Mobile Crane 50t", status: "maintenance", hours: 320, utilization: 0 },
    { name: "Concrete Pump", status: "operational", hours: 560, utilization: 65 },
    { name: "Dump Truck (Fleet #4)", status: "operational", hours: 890, utilization: 82 },
    { name: "Piling Rig", status: "down", hours: 210, utilization: 0 }
];

// Helper random
const rand = (min, max) => +(min + Math.random() * (max - min)).toFixed(1);

function updateMetrics() {
    return {
        activeWorkers: Math.floor(rand(48, 187)),
        dailyMaterial: rand(24.5, 89.2),
        safetyScore: rand(72, 98)
    };
}

function renderKPIs(metrics) {
    const container = document.getElementById("kpiGrid");
    if (!container) return;
    container.innerHTML = `
        <div class="kpi-card"><div class="kpi-title"><i class="fas fa-users"></i> Active Workers</div><div class="kpi-value">${metrics.activeWorkers}</div></div>
        <div class="kpi-card"><div class="kpi-title"><i class="fas fa-truck"></i> Material Used (today)</div><div class="kpi-value">${metrics.dailyMaterial}<span class="kpi-unit">tons</span></div></div>
        <div class="kpi-card"><div class="kpi-title"><i class="fas fa-chart-line"></i> Overall Progress</div><div class="kpi-value">${Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}<span class="kpi-unit">%</span></div></div>
        <div class="kpi-card"><div class="kpi-title"><i class="fas fa-shield-alt"></i> Safety Index</div><div class="kpi-value">${metrics.safetyScore}<span class="kpi-unit">/100</span></div></div>
    `;
}

function renderProjects() {
    const container = document.getElementById("projectsList");
    if (!container) return;
    container.innerHTML = projects.map(p => `
        <div class="project-item">
            <div class="project-header">
                <span><i class="fas fa-building"></i> ${p.name}</span>
                <span class="status-badge ${p.status}">${p.status === 'on-track' ? 'On Track' : (p.status === 'delayed' ? 'Delayed' : 'Critical')}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${p.progress}%;"></div></div>
            <div style="display: flex; justify-content: space-between; font-size:0.7rem; color:#475569;">
                <span>${p.location}</span>
                <span>${p.progress}% complete</span>
            </div>
        </div>
    `).join('');
}

function renderEquipment() {
    const container = document.getElementById("equipmentList");
    if (!container) return;
    container.innerHTML = equipment.map(e => `
        <div class="equipment-item">
            <div class="equipment-header">
                <span><i class="fas ${e.name.includes('Excavator') ? 'fa-tractor' : (e.name.includes('Crane') ? 'fa-crane' : 'fa-truck')}"></i> ${e.name}</span>
                <span class="equipment-status ${e.status}">${e.status}</span>
            </div>
            <div style="font-size:0.7rem; display: flex; justify-content: space-between;">
                <span>📊 Util: ${e.utilization}%</span>
                <span>⏱️ Hours: ${e.hours}</span>
            </div>
            ${e.status === 'operational' ? `<div class="progress-bar" style="margin-top:6px;"><div class="progress-fill" style="width: ${e.utilization}%; background:#f97316;"></div></div>` : ''}
        </div>
    `).join('');
}

// Charts
let materialChart, safetyChart;

function initCharts() {
    const ctxMat = document.getElementById('materialChart')?.getContext('2d');
    const ctxSafe = document.getElementById('safetyChart')?.getContext('2d');
    if (!ctxMat || !ctxSafe) return;

    materialChart = new Chart(ctxMat, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Concrete (tons)',
                data: [120, 145, 132, 168],
                borderColor: '#f97316',
                tension: 0.3,
                fill: false
            }]
        }
    });

    safetyChart = new Chart(ctxSafe, {
        type: 'pie',
        data: {
            labels: ['No Incidents', 'Minor Incidents', 'Major Incidents'],
            datasets: [{
                data: [28, 2, 0],
                backgroundColor: ['#22c55e', '#f97316', '#ef4444']
            }]
        }
    });
}

function refreshDashboard() {
    const metrics = updateMetrics();
    renderKPIs(metrics);
    renderProjects();
    renderEquipment();
    // Simulate dynamic chart updates (optional)
    if (materialChart) {
        materialChart.data.datasets[0].data = materialChart.data.datasets[0].data.map(() => rand(100, 180));
        materialChart.update();
    }
    if (safetyChart) {
        const incidents = [rand(25, 30), rand(1, 4), rand(0, 1)];
        safetyChart.data.datasets[0].data = incidents;
        safetyChart.update();
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    refreshDashboard();
    setInterval(refreshDashboard, 10000); // refresh every 10 seconds
});