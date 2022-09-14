
async function fetchData() {
   const url = `https://swapi.dev/api/starships/?format=json`;

   const response = await fetch(url);
   const datapoints = await response.json();
   //console.log(datapoints);
   return datapoints;
}
var fetchedData = fetchData()

var nomes = fetchedData.then(datapoints => {
   const name = datapoints.results.map(
      function (index) {
         return index.name;
      }
   )
   console.log(name);
});

var comprimento = fetchedData.then(datapoints => {
   const length = datapoints.results.map(
      function (index) {
         return index.length;
      }
   )

   console.log(length);
});

var lengthNumber = comprimento.map(value => isNaN(value) ? 0 : value);


const data = {
   labels: nomes,
   datasets: [{
      label: 'label',
      data: lengthNumber,
      backgroundColor: [
         'rgba(110, 165, 200, 1)',
         'rgba(111, 242, 97, 1)',
         'rgba(242, 122, 82, 1)'
      ]
   }]
}

const grafico1 = document.getElementById('grafico1').getContext('2d');
const chart1 = new Chart(grafico1, {
   type: 'bar',
   data,
});
/*
const grafico2 = document.getElementById('grafico2').getContext('2d');
const chart2 = new Chart(grafico2, {
   type: 'doughnut',
   data: {
      labels: Object.keys(data),
      datasets: [
         {
            label: 'LABEL',
            data: Object.values(data),
            backgroundColor: [
               'rgba(110, 165, 200, 1)',
               'rgba(111, 242, 97, 1)',
               'rgba(242, 122, 82, 1)'
            ]
         }
      ]
   },
});


const grafico3 = document.getElementById('grafico3').getContext('2d');
const chart3 = new Chart(grafico3, {
   type: 'line',
   data: {
      labels: Object.keys(data),
      datasets: [
         {
            label: 'LABEL',
            data: Object.values(data),
            backgroundColor: [
               'rgba(110, 165, 200, 1)',
               'rgba(111, 242, 97, 1)',
               'rgba(242, 122, 82, 1)'
            ]
         }
      ]
   },
});


const grafico4 = document.getElementById('grafico4').getContext('2d');
const chart4 = new Chart(grafico4, {
   type: 'polarArea',
   data: {
      labels: Object.keys(data),
      datasets: [
         {
            label: 'LABEL',
            data: Object.values(data),
            backgroundColor: [
               'rgba(110, 165, 200, 1)',
               'rgba(111, 242, 97, 1)',
               'rgba(242, 122, 82, 1)'
            ]
         }
      ]
   },
});



*/
