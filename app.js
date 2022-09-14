// Preset de Dados para inicializar o grafico
const data = {
   labels: ['item'],
   datasets: [{
      label: 'label',
      backgroundColor: [
         "#012A4A",
         "#013A63",
         "#01497C",
         "#014F86",
         "#2A6F97",
         "#2C7DA0",
         "#468FAF",
         "#61A5C2",
         "#89C2D9",
         "#A9D6E5",
      ],
      data: [0],
      tension: 0.5
   }]
};

// Configurações de Animação
const options = {
   animation: {
      onComplete: () => {
         delayed = true;
      },
      delay: (context) => {
         let delay = 0;
         if (context.type === 'data' && context.mode === 'default' && !delay) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
         }
         return delay;
      },
   },
   scales: {
      x: {
         stacked: true,
      },
      y: {
         stacked: true
      }
   }
};

// Gráficos
const grafico1 = document.getElementById('grafico1').getContext('2d');
const chart1 = new Chart(grafico1, {
   type: 'bar',
   data,
   options
});

const grafico2 = document.getElementById('grafico2').getContext('2d');
const chart2 = new Chart(grafico2, {
   type: 'doughnut',
   data,
   options
});

const grafico3 = document.getElementById('grafico3').getContext('2d');
const chart3 = new Chart(grafico3, {
   type: 'line',
   data,
   options
});

const grafico4 = document.getElementById('grafico4').getContext('2d');
const chart4 = new Chart(grafico4, {
   type: 'line',
   data,
   options
});

// Função que acessa a API e retorna o JSON
async function fetchData() {
   const url = `https://swapi.dev/api/starships/?format=json`;

   const response = await fetch(url);
   const datapoints = await response.json();
   //console.log(datapoints);
   return datapoints;
}

// Aciona o acesso a API e armazena o JSON
var fetchedData = fetchData()

// Função coleta o JSON, trata os dados (entrega um array no formato correto(string ou numero)), atualiza os dados de cada gráfico e dá um refresh nele
function atualizaGraficos() {
   fetchedData.then(datapoints => {
      const name = datapoints.results.map(
         function (index) {
            return index.name;
         }
      )
      //console.log(name);

      const hyperdrive_rating = datapoints.results.map(
         function (index) {
            return index.hyperdrive_rating;
         }
      )
      //console.log(hyperdrive_rating.map(Number).map(value => isNaN(value) ? 0 : value));

      const cost_in_credits = datapoints.results.map(
         function (index) {
            return index.cost_in_credits;
         }
      )

      const length = datapoints.results.map(
         function (index) {
            return index.length;
         }
      )

      const crew = datapoints.results.map(
         function (index) {
            return index.crew;
         }
      )


      chart1.data.labels = name;
      chart1.data.datasets[0].data = hyperdrive_rating.map(Number).map(value => isNaN(value) ? 0 : value);
      chart1.data.datasets[0].label = "Pontuação do Hyperdrive";
      chart1.update();

      chart2.data.labels = name;
      chart2.data.datasets[0].data = cost_in_credits.map(Number).map(value => isNaN(value) ? 0 : value);
      chart2.data.datasets[0].label = "";
      chart2.update();

      chart3.data.labels = name;
      chart3.data.datasets[0].data = length.map(Number).map(value => isNaN(value) ? 0 : value);
      chart3.data.datasets[0].label = "Comprimento";
      chart3.update();

      chart4.data.labels = name;
      chart4.data.datasets[0].data = crew.map(Number).map(value => isNaN(value) ? 0 : value);
      chart4.data.datasets[0].label = "";
      chart4.update();
   })
};

atualizaGraficos()