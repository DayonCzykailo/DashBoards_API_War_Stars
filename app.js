// Preset de Dados para inicializar o grafico
const color = ["#ff0000"];
const alternativeColor = ["#ffdd00"];
const subColor = ["#9B0000"];

const data1 = {
   labels: ['item'],
   datasets: [{
      type: 'bar',
      label: 'label',
      backgroundColor: color,
      data: [0],
      tension: 0.5
   }]
};
const data2 = {
   labels: ['item'],
   datasets: [
      {
         type: 'line',
         label: 'label',
         backgroundColor: color,
         borderColor: subColor,
         data: [0],
         tension: 0.5
      },
      {
         type: 'bar',
         label: 'label',
         backgroundColor: alternativeColor,
         borderColor: subColor,
         data: [0],
         tension: 0.5
      }
   ]
};

const data3 = {
   labels: ['item'],
   datasets: [{
      type: 'line',
      label: 'label',
      backgroundColor: color,
      borderColor: subColor,
      data: [0],
      tension: 0.5
   }]
};

const data4 = {
   labels: ['item'],
   datasets: [{
      type: 'line',
      label: 'label',
      backgroundColor: color,
      borderColor: subColor,
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
         ticks: {
            color: "#FFFFFF",
         }
      },
      y: {
         stacked: true,
         ticks: {
            color: "#FFFFFF",
         }
      }
   },
};

// Gráficos
const grafico1 = document.getElementById('grafico1').getContext('2d');
const chart1 = new Chart(grafico1, {
   data: data1,
   options
});

const grafico2 = document.getElementById('grafico2').getContext('2d');
const chart2 = new Chart(grafico2, {
   data: data2,
   options
});

const grafico3 = document.getElementById('grafico3').getContext('2d');
const chart3 = new Chart(grafico3, {
   data: data3,
   options
});

const grafico4 = document.getElementById('grafico4').getContext('2d');
const chart4 = new Chart(grafico4, {
   data: data4,
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
var fetchedData = fetchData();
//console.log(fetchedData);

//Remove um item de um json
function remove(nome, dados) {
   return dados.then(datapoints => {
      try {//na primeira filtragem tem o results mas depois não
         //console.log("dentro do try");
         const filteredData = datapoints.results.filter(results => results.name != nome)
         //console.log(filteredData);
         return filteredData
      } catch {
         //console.log("dentro do catch");
         const filteredData = datapoints.filter(datapoints => datapoints.name != nome)
         //console.log(filteredData);
         return filteredData
      }
   })
};

var nomesRemovidos = ["Death Star", "Rebel transport", "Executor"]

var dadosFiltrados = filtra();

//Para cada nome da lista recebida ele vasculha o json e remove o item
function filtra() {
   var temp = fetchedData;
   nomesRemovidos.forEach(function (nome) {
      //console.log(nome);
      //console.log(temp);
      temp = remove(nome, temp)
   })
   return temp
};

// Função coleta o JSON, trata os dados (entrega um array no formato correto(string ou numero)), atualiza os dados de cada gráfico e dá um refresh nele
function atualizaGraficos() {
   console.log(dadosFiltrados)
   dadosFiltrados.then(datapoints => {
      const name = datapoints.map(
         function (index) {
            return index.name;
         }
      )
      //console.log(name);

      const hyperdrive_rating = datapoints.map(
         function (index) {
            return index.hyperdrive_rating;
         }
      )
      //console.log(hyperdrive_rating.map(Number).map(value => isNaN(value) ? 0 : value));

      const cost_in_credits = datapoints.map(
         function (index) {
            return index.cost_in_credits;
         }
      )

      const length = datapoints.map(
         function (index) {
            return index.length;
         }
      )

      const crew = datapoints.map(
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
      chart2.data.datasets[1].data = cost_in_credits.map(Number).map(value => isNaN(value) ? 0 : value);
      chart2.data.datasets[0].label = "Custo em Créditos";
      chart2.data.datasets[1].label = "";
      chart2.update();

      chart3.data.labels = name;
      chart3.data.datasets[0].data = length.map(Number).map(value => isNaN(value) ? 0 : value);
      chart3.data.datasets[0].label = "Comprimento";
      chart3.update();

      chart4.data.labels = name;
      chart4.data.datasets[0].data = crew.map(Number).map(value => isNaN(value) ? 0 : value);
      chart4.data.datasets[0].label = "Tripulação";
      chart4.update();
   })
};

//Cria checkbox
//function carregaMenu() {
//   var nomes = fetchedData.then(datapoints => {
//      const todosOsNomes = datapoints.results.map(function (index) {
//         return index.name;
//      })
//      return todosOsNomes
//   })
//   console.log(nomes)
//   nomes.forEach(function (nome) {
//      var checkbox = document.createElement('input');
//      checkbox.type = 'checkbox';
//      checkbox.id = nome;
//      checkbox.name = 'interest';
//      checkbox.value = nome;
//
//      var label = document.createElement(nome)
//      label.htmlFor = nome;
//      label.appendChild(document.createTextNode(nome));
//
//      var br = document.createElement('br');
//
//      var container = document.getElementById('container');
//      container.appendChild(checkbox);
//      container.appendChild(label);
//      container.appendChild(br);
//   })
//
//}
//
//carregaMenu()
atualizaGraficos()