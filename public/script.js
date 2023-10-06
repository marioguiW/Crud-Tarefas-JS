const endpointTarefas = "http://localhost:3000/tarefas/"
const botaoAdd = document.getElementById("adiciona");
const cards = document.getElementById("cards");

async function pegaApi() {
    const respostaTarefas = await fetch(endpointTarefas);
    const respostaTarefasJson = await respostaTarefas.json();

    criaCard();
}
pegaApi();

async function criaTarefa(titulo, prioridade, url, cor, corFundo){
    const conexao = await fetch(endpointTarefas, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            prioridade: prioridade,
            image: url,
            cor: cor,
            corFundo: corFundo
        })
    });

    const conexaoConvertida = conexao.json();

    criaCard();
}


async function getTarefa(){
    const titulo = document.querySelector("input").value;
    const prioridade = document.getElementById("option").value;
    var url;
    var cor;
    var corFundo;



    if(prioridade === "Emergencia!") {
        url = "https://cdn-icons-png.flaticon.com/128/1331/1331377.png"
        cor = "#cf4a3e"
        corFundo ="#ff8175" 
    } else if (prioridade === "Muito Urgente!"){
        url = "https://cdn-icons-png.flaticon.com/128/5060/5060502.png"
        cor = "#cf823e"
        corFundo = "#ffb26e"
    } else if (prioridade === "Urgente"){
        url = "https://cdn-icons-png.flaticon.com/128/6290/6290515.png"
        cor = "#f2ff00"
        corFundo = "#fbffb3"
    } else if (prioridade === "Pouco Urgente"){
        url = "https://cdn-icons-png.flaticon.com/128/478/478027.png"
        cor = "#a1cf3e"
        corFundo = "#deff96"
    } else {
        url = "https://cdn-icons-png.flaticon.com/128/2593/2593825.png"
        cor = "#3e9acf"
        corFundo = "#8ad4ff"
    }

    await criaTarefa(titulo, prioridade, url, cor, corFundo);
}

async function deletaCard(id){
    const conexao = await fetch(endpointTarefas + id, {
        method: "DELETE"
    })
    const conexaoConvertida = conexao.json();
    criaCard(conexaoConvertida);
}

botaoAdd.addEventListener("click", (evento) => getTarefa());

async function criaCard(){
    const respostaTarefas = await fetch(endpointTarefas);
    const respostaTarefasJson = await respostaTarefas.json();

    cards.innerHTML = ''

    await respostaTarefasJson.forEach(tarefa => {
        cards.innerHTML += 
        `
            <div class="card" style="background-color: ${tarefa.corFundo}; border: 4px solid ${tarefa.cor};">
                <div class=icons>
                    <img id="${tarefa.id}" class="imagem-icone-edit" src="https://cdn-icons-png.flaticon.com/128/5857/5857203.png"/>
                    <img id="${tarefa.id}" class="imagem-icone-delete" src="https://cdn-icons-png.flaticon.com/128/6821/6821175.png"/>
                </div>
                <h1>${tarefa.titulo}</h1>
                <img class="imagem-principal" src=${tarefa.image}></img>
                <h1>${tarefa.prioridade}</h1>
            </div>
        `
    })

    const botaoDelete = document.querySelectorAll(".imagem-icone-delete");
    const botaoEdit = document.querySelectorAll(".imagem-icone-edit")
    const icones = document.querySelector(".icons")


    botaoDelete.forEach(botao => {
        botao.addEventListener("click", evento => {
            deletaCard(evento.target.id)
        })
    })

    botaoEdit.forEach(botao => {
        botao.addEventListener("click", evento => {
        
            const divIcons = botao.parentElement
        
            divIcons.innerHTML = `
                <div>
                    <label>Digite a tarefa:</label>
                    <input id="tarefaAtualizada" required type="text"/>
                    <select id="optionAtualizada">
                        <option>Emergencia!</option>
                        <option>Muito Urgente!</option>
                        <option>Urgente</option>
                        <option>Pouco Urgente</option>
                        <option>Não Urgente</option>
                    </select>   
                    <button id="botao-atualizar">Atualizar!</button>              
                </div>
            ` 
            const botaoAtualizar = document.querySelector("#botao-atualizar")

            botaoAtualizar.addEventListener("click", (evento) => {
                const tarefaAtualizada = document.querySelector("#tarefaAtualizada").value
                const optionAtualizada = document.querySelector("#optionAtualizada").value
                const idAtualizado = botao.id
                
                getTarefaAtualizada(idAtualizado, tarefaAtualizada, optionAtualizada)
            })
        })
    })

}

async function getTarefaAtualizada(idAtualizado, tarefaAtualizada, optionAtualizada){
    var url;
    var cor;
    var corFundo;

    if(optionAtualizada === "Emergencia!") {
        url = "https://cdn-icons-png.flaticon.com/128/1331/1331377.png"
        cor = "#cf4a3e"
        corFundo ="#ff8175" 
    } else if (optionAtualizada === "Muito Urgente!"){
        url = "https://cdn-icons-png.flaticon.com/128/5060/5060502.png"
        cor = "#cf823e"
        corFundo = "#ffb26e"
    } else if (optionAtualizada === "Urgente"){
        url = "https://cdn-icons-png.flaticon.com/128/6290/6290515.png"
        cor = "#f2ff00"
        corFundo = "#fbffb3"
    } else if (optionAtualizada === "Pouco Urgente"){
        url = "https://cdn-icons-png.flaticon.com/128/478/478027.png"
        cor = "#a1cf3e"
        corFundo = "#deff96"
    } else {
        url = "https://cdn-icons-png.flaticon.com/128/2593/2593825.png"
        cor = "#3e9acf"
        corFundo = "#8ad4ff"
    }

    await atualizaCard(idAtualizado, tarefaAtualizada,optionAtualizada,url, cor, corFundo)
}


async function atualizaCard(id,titulo,prioridade, url, cor, corFundo){
    const conexao = await fetch(endpointTarefas + id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            prioridade: prioridade,
            image: url,
            cor: cor,
            corFundo: corFundo
        })
    })
    const conexaoConvertida = conexao.json();
    criaCard(conexaoConvertida);
}

