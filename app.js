var data = {
    'item1' : 1,
    'item2' : 2,
    'item3' : 3,
    'item4' : 4,
    'item5' : 5,
 }
 
 const grafico1 = document.getElementById('grafico1').getContext('2d');
 const chart1 = new Chart(grafico1, {
    type: 'bar',
    data: {
       labels: Object.keys(data),
       datasets: [
          {
             label: 'LABEL',
             data: Object.values(data),
          }
       ]
    },
 });
 
