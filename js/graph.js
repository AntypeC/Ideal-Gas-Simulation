var ctx = document.getElementById('P-against-V').getContext('2d');
var n = 1; // number of moles
var R = 8.314; // ideal gas constant
var T = [273, 298, 323, 348, 373]; // temperatures in Kelvins
var P = []; // pressures

// calculate pressures for each temperature using PV = nRT
for (var i = 0; i < T.length; i++) {
    P[i] = n * R * T[i];
}

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['273K', '298K', '323K', '348K', '373K'],
        datasets: [{
            label: 'Pressure (P)',
            data: P,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
          xAxes: [{
            ticks: {
              fontColor: 'white'
            },
            // Change the color of the x-axis to red
            gridLines: {
                color: 'grey'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
              // Change the color of the y-axis to blue
              gridLines: {
                  color: 'grey'
              }
          }],
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        title: {
            display: true,
            text: 'Ideal Gas Law: PV = nRT'
        }
    }
});