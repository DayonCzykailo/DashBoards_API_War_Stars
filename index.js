const requisicao = async ()  =>  {
   
    const url = `https://swapi.dev/api/starships`;


     return await fetch(url, {
         method:  "GET",
         headers:{
            'Content-Type': "application/json"
         }
        }).then(resposta => resposta.json)
        .then((dados)=>{
            console.log(dados);

        }).
        catch(erro => console.log(erro));
}

requisicao()

const grafico2= document.getElementById('grafico2').getContext('2d');
const chart2 = new Chart(grafico2, {
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
