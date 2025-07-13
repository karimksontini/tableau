// Tableau de Bord - Secteur Textile Tunisien
// JavaScript pour les visualisations et interactions

// Configuration globale des graphiques
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#2c3e50';

// Données du secteur textile
const textileData = {
    indicateurs_cles: {
        exportations_2025: {
            valeur_mdt: 2998.3,
            evolution_pct: 0.28,
            valeur_eur: 897.9,
            evolution_eur_pct: 1.39,
            volume_evolution_pct: 4.95
        },
        emplois: 153000,
        entreprises_total: 1902,
        entreprises_exportatrices_pct: 39,
        taux_couverture: 129,
        position_ue_workwear: {
            rang: 1,
            part_marche_pct: 17.4
        }
    },
    exportations_par_produit: [
        { produit: "Pantalons Jeans", valeur_mdt: 385.2, evolution_pct: -2.42, volume_tonnes: 3895, evolution_volume_pct: 4.20 },
        { produit: "Vêtements de travail", valeur_mdt: 329.8, evolution_pct: 5.62, volume_tonnes: 3625, evolution_volume_pct: 8.72 },
        { produit: "Pantalons ville", valeur_mdt: 254.8, evolution_pct: -0.15, volume_tonnes: 2039, evolution_volume_pct: 5.62 },
        { produit: "T-shirts", valeur_mdt: 199.6, evolution_pct: -29.75, volume_tonnes: 2496, evolution_volume_pct: -36.98 },
        { produit: "Pullovers/gilets", valeur_mdt: 147.0, evolution_pct: -14.15, volume_tonnes: 914, evolution_volume_pct: -14.33 },
        { produit: "Lingerie femme", valeur_mdt: 128.0, evolution_pct: -12.80, volume_tonnes: 487, evolution_volume_pct: 2.83 },
        { produit: "Chemises", valeur_mdt: 123.8, evolution_pct: -9.18, volume_tonnes: 715, evolution_volume_pct: -8.88 }
    ],
    marches_exportation: [
        { marche: "France", evolution_pct: -9.07, evolution_volume_pct: -6.43 },
        { marche: "Italie", evolution_pct: -7.51, evolution_volume_pct: 10.75 },
        { marche: "Allemagne", evolution_pct: -10.51, evolution_volume_pct: 12.99 },
        { marche: "Belgique", evolution_pct: -8.84, evolution_volume_pct: null }
    ],
    structure_sectorielle: [
        { categorie: "Confection chaîne & trame", nombre_entreprises: 872, emplois: 118722, pourcentage: 77 },
        { categorie: "Autres industries textiles", nombre_entreprises: 197, emplois: 34408, pourcentage: 21 },
        { categorie: "Bonneterie", nombre_entreprises: 89, emplois: 15838, pourcentage: 10 },
        { categorie: "Finissage", nombre_entreprises: 24, emplois: 8417, pourcentage: 5 },
        { categorie: "Tissage", nombre_entreprises: 13, emplois: 2425, pourcentage: 2 },
        { categorie: "Filature", nombre_entreprises: 10, emplois: 1733, pourcentage: 1 }
    ]
};

// Palette de couleurs
const colors = {
    primary: '#3498db',
    secondary: '#2c3e50',
    success: '#27ae60',
    warning: '#f39c12',
    danger: '#e74c3c',
    info: '#17a2b8',
    light: '#ecf0f1',
    gradients: {
        blue: ['#667eea', '#764ba2'],
        green: ['#4ecdc4', '#44a08d'],
        orange: ['#ffecd2', '#fcb69f'],
        red: ['#ff9a9e', '#fecfef'],
        purple: ['#a8edea', '#fed6e3']
    }
};

// Fonction pour changer d'onglet
function showTab(tabName) {
    // Masquer tous les contenus d'onglets
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Désactiver tous les boutons d'onglets
    const tabButtons = document.querySelectorAll('.nav-tab');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Afficher le contenu de l'onglet sélectionné
    document.getElementById(tabName).classList.add('active');
    
    // Activer le bouton d'onglet correspondant
    event.target.classList.add('active');

    // Redessiner les graphiques si nécessaire
    setTimeout(() => {
        redrawCharts(tabName);
    }, 100);
}

// Fonction pour redessiner les graphiques
function redrawCharts(tabName) {
    switch(tabName) {
        case 'vue-ensemble':
            createKPIChart();
            createSecteurChart();
            break;
        case 'performance':
            createProduitsChart();
            break;
        case 'marches':
            createMarchesChart();
            createConcentrationChart();
            break;
        case 'tendances':
            createTendancesChart();
            createCertificationsChart();
            break;
        case 'recommandations':
            createPlanActionChart();
            break;
    }
}

// Graphique KPI Vue d'ensemble
function createKPIChart() {
    const ctx = document.getElementById('kpiChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Exportations (MDT)',
                'Emplois (milliers)',
                'Position UE (%)',
                'Taux Couverture (%)',
                'Croissance Volume (%)',
                'Entreprises Exportatrices (%)'
            ],
            datasets: [{
                label: 'Performance 2025',
                data: [75, 85, 90, 80, 70, 65],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: colors.primary,
                borderWidth: 2,
                pointBackgroundColor: colors.primary,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors.primary
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    });
}

// Graphique Structure Sectorielle
function createSecteurChart() {
    const ctx = document.getElementById('secteurChart');
    if (!ctx) return;

    const data = textileData.structure_sectorielle;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(item => item.categorie),
            datasets: [{
                data: data.map(item => item.emplois),
                backgroundColor: [
                    colors.primary,
                    colors.success,
                    colors.warning,
                    colors.danger,
                    colors.info,
                    colors.secondary
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString()} emplois (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Graphique Exportations par Produit
function createProduitsChart() {
    const ctx = document.getElementById('produitsChart');
    if (!ctx) return;

    const data = textileData.exportations_par_produit;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.produit),
            datasets: [
                {
                    label: 'Valeur (MDT)',
                    data: data.map(item => item.valeur_mdt),
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Évolution (%)',
                    data: data.map(item => item.evolution_pct),
                    type: 'line',
                    borderColor: colors.danger,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    pointBackgroundColor: colors.danger,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        maxRotation: 45
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Valeur (MDT)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Évolution (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Graphique Performance par Marché
function createMarchesChart() {
    const ctx = document.getElementById('marchesChart');
    if (!ctx) return;

    const data = textileData.marches_exportation;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.marche),
            datasets: [
                {
                    label: 'Évolution Valeur (%)',
                    data: data.map(item => item.evolution_pct),
                    backgroundColor: data.map(item => item.evolution_pct >= 0 ? colors.success : colors.danger),
                    borderColor: data.map(item => item.evolution_pct >= 0 ? colors.success : colors.danger),
                    borderWidth: 1
                },
                {
                    label: 'Évolution Volume (%)',
                    data: data.map(item => item.evolution_volume_pct || 0),
                    backgroundColor: data.map(item => (item.evolution_volume_pct || 0) >= 0 ? 
                        'rgba(39, 174, 96, 0.5)' : 'rgba(231, 76, 60, 0.5)'),
                    borderColor: data.map(item => (item.evolution_volume_pct || 0) >= 0 ? colors.success : colors.danger),
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Évolution (%)'
                    }
                }
            }
        }
    });
}

// Graphique Concentration Géographique
function createConcentrationChart() {
    const ctx = document.getElementById('concentrationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Union Européenne', 'Autres Marchés'],
            datasets: [{
                data: [80, 20],
                backgroundColor: [colors.primary, colors.warning],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

// Graphique Tendances Stratégiques
function createTendancesChart() {
    const ctx = document.getElementById('tendancesChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            datasets: [
                {
                    label: 'Textile Technique (Mrd $)',
                    data: [150, 155, 162, 170, 175, 180, 194, 210, 227, 245, 265],
                    borderColor: colors.primary,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Nearshoring (Index)',
                    data: [100, 105, 115, 125, 140, 155, 170, 185, 200, 215, 230],
                    borderColor: colors.success,
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Mode Durable (Index)',
                    data: [100, 110, 125, 145, 165, 185, 210, 235, 260, 285, 310],
                    borderColor: colors.warning,
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Année'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valeur/Index'
                    }
                }
            }
        }
    });
}

// Graphique Certifications Durabilité
function createCertificationsChart() {
    const ctx = document.getElementById('certificationsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['GOTS', 'OEKO-TEX', 'ISO 14001', 'Cradle to Cradle', 'BlueSign'],
            datasets: [{
                data: [25, 45, 30, 15, 20],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(39, 174, 96, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(155, 89, 182, 0.7)'
                ],
                borderColor: [
                    colors.primary,
                    colors.success,
                    colors.warning,
                    colors.danger,
                    '#9b59b6'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed} entreprises`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}

// Graphique Plan d'Action
function createPlanActionChart() {
    const ctx = document.getElementById('planActionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Modernisation\nTechnologique',
                'Intégration\nVerticale',
                'Marketing &\nCommercial',
                'Optimisation\nÉcosystème',
                'Innovation\n& R&D'
            ],
            datasets: [
                {
                    label: 'Priorité (1-10)',
                    data: [9, 8, 7, 8, 9],
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 1
                },
                {
                    label: 'Impact Attendu (1-10)',
                    data: [9, 7, 6, 7, 8],
                    backgroundColor: colors.success,
                    borderColor: colors.success,
                    borderWidth: 1
                },
                {
                    label: 'Facilité Mise en Œuvre (1-10)',
                    data: [5, 6, 8, 7, 4],
                    backgroundColor: colors.warning,
                    borderColor: colors.warning,
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Score (1-10)'
                    }
                }
            }
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Créer les graphiques de la vue d'ensemble par défaut
    createKPIChart();
    createSecteurChart();
    
    // Ajouter des animations aux cartes
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Ajouter des effets de survol aux métriques
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(metric => {
        metric.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        metric.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Ajouter la fonctionnalité d'impression
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Imprimer';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: var(--shadow);
        z-index: 1000;
    `;
    printButton.addEventListener('click', () => window.print());
    document.body.appendChild(printButton);

    // Ajouter la fonctionnalité d'export des données
    const exportButton = document.createElement('button');
    exportButton.innerHTML = '📊 Exporter Données';
    exportButton.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: var(--success-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: var(--shadow);
        z-index: 1000;
    `;
    exportButton.addEventListener('click', exportData);
    document.body.appendChild(exportButton);

    console.log('Tableau de bord textile tunisien initialisé avec succès!');
});

// Fonction d'export des données
function exportData() {
    const dataToExport = {
        date_export: new Date().toISOString(),
        secteur: "Textile et Habillement Tunisien",
        periode: "Janvier-Avril 2025",
        donnees: textileData
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'donnees_textile_tunisie_2025.json';
    link.click();
}

// Fonction utilitaire pour formater les nombres
function formatNumber(num) {
    return new Intl.NumberFormat('fr-FR').format(num);
}

// Fonction utilitaire pour formater les pourcentages
function formatPercentage(num) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
    }).format(num / 100);
}

// Gestion responsive des graphiques
window.addEventListener('resize', function() {
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.resize();
    });
});