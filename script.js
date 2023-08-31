const endpointTarefas = "http://localhost:3000/tarefas"
const endpointImagens = "http://localhost:3000/imagens"
const botaoAdd = document.getElementById("adiciona");
const cards = document.getElementById("cards");

async function pegaApi() {
    const respostaTarefas = await fetch(endpointTarefas);
    const respostaImagens = await fetch(endpointImagens);
    const respostaTarefasJson = await respostaTarefas.json();
    const respostaImagensJson = await respostaImagens.json();
    console.log(respostaImagensJson, respostaTarefasJson);
    criaCard(respostaTarefasJson, respostaImagensJson)
}
pegaApi();

async function criaTarefa(titulo, prioridade, url){
    const conexao = await fetch(endpointTarefas, {
        method: "POST",
        headers: {
            "Content-type ": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            prioridade: prioridade,
            image: url
        })
    });

    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

function getTarefa(){
    const titulo = document.querySelector("input").value;
    const prioridade = document.getElementById("option").value;


    if(prioridade === "Emergencia!") {
        const url = "https://cdn-icons-png.flaticon.com/128/1331/1331377.png"
    } else if (prioridade === "Muito Urgente!"){
        const url = "https://cdn-icons-png.flaticon.com/128/6939/6939131.png"
    } else if (prioridade === "Urgente"){
        const url = "https://cdn-icons-png.flaticon.com/128/5060/5060502.png"
    } else if (prioridade === "Pouco Urgente"){
        const url = "https://cdn-icons-png.flaticon.com/128/5060/5060502.png"
    } else {
        const url = "https://cdn-icons-png.flaticon.com/128/2593/2593825.png"
    }

    criaTarefa(titulo, prioridade, url);
}

botaoAdd.addEventListener("click", (evento) => getTarefa());

// function criaCard(tarefas, imagens){
//     botaoAdd.addEventListener("click", (evento) => {
//         const opcaoSelecionada = optionUrgencia.options[optionUrgencia.selectedIndex].textContent
//         console.log(opcaoSelecionada)

//         var urlImagemUrgencia
//         imagens.forEach(imagem => {
//             if(optionUrgencia.value === imagem.nome){
//                 console.log("achou")
//                 urlImagemUrgencia = imagem.url
//            }
//         })
//         console.log(urlImagemUrgencia);
//         cards.innerHTML += `
//             <div class="card">
//             <h2>${inputTarefa.value}</h2>
//             <img src="${urlImagemUrgencia}"/>
//             <h2>${opcaoSelecionada}</h2>
//             </div>
//         `
//     }
// )}