// Função para validar a seleção de dificuldade
function validateForm(){
    let dificuldade = document.forms["form"]["dificuldade"].value;

    if(dificuldade == ""){
        aviso("Você não selecionou uma dificuldade!");
        return false;
    }
}


// Função inicial
function iniciar(){
    // Pega a dificuldade selecionada da URL
    let dificuldade = (window.location.search).substring(13);
    // OBS: Se mudar o name do formulário, é preciso mudar o número da substring()

    // Pega o tamanho do tabuleiro baseado na dificuldade escolhida
    let tamanho = getDifficultySize(dificuldade);
    let [tabela, celulas] = buildTable(tamanho);

    // Coloca o tabuleiro na div base
    let base = document.querySelector(".base");
    base.appendChild(tabela);

    //console.log(celulas);
    // Inicia o jogo
    jogo(celulas);
}


// Função que roda o jogo
function jogo(celulas){
    // Aleatoriza a ordem dos ids das células
    celulas = celulas.sort(() => Math.random() - 0.5);
    //console.log(celulas)

    let primeiroId = celulas[0];
    let ultimoId = celulas[celulas.length-1];

    // Coloca a classe de clicado na primeira célula
    let firstCell = document.querySelector('#'+primeiroId);
    firstCell.classList.add("clicado");

    let lastCell = document.querySelector('#'+ultimoId);

    // Percorre a lista de ids
    for (let i = 0; i<celulas.length; i++) {
        
        let cell = document.querySelector('#'+celulas[i]);

        // Define a função ao clicar nas células
        cell.addEventListener("click", ()=>{
            // Verifica se a célula já foi clicada
            if(cell.classList.contains("clicado")){
                
                // Verifica se a célula clicada foi a última e sai da função se for
                if(cell == lastCell){
                    let tabuleiro = document.querySelector('table');
                    vencer(tabuleiro);
                    return;
                }

                // Adiciona o estado de clicado à próxima célula da lista
                let nextCell = document.querySelector('#'+celulas[i+1]);
                nextCell.classList.add("clicado");
            }
        })
        
    }

}


// Função que determina o tamanho do tabuleiro baseado na dificuldade
function getDifficultySize(dificuldade){
    if(dificuldade == 'facil'){
        return 3;

    }else if(dificuldade == 'medio'){
        return 5;

    }else if(dificuldade == 'dificil'){
        return 7;
    }
}


// Função para montar o tabuleiro
function buildTable(tamanho){
    //lista com os ids das células
    let celulas = [];
    // ids das celulas
    let cellId = 0;


    // Criando a tabela
    let tabela = document.createElement("table");
    tabela.id = "tabuleiro";

    // Criando as fileiras
    for (i=0; i<tamanho; i++){
        let row = document.createElement("tr");
        row.id = String(`row${i}`);
        tabela.appendChild(row);

        // Criando as células
        for(j=0; j<tamanho; j++){
            let cell = document.createElement("td");
            cell.id = `c${cellId}`;

            // Colocando as células na fileira
            row.appendChild(cell);

            // Criando a lista de ids das células
            celulas.push(`c${cellId}`);

            cellId++;
        }
    }
    
    
    return [tabela, celulas];
};


// Função para criar aviso (div) após um elemento
function aviso(mensagem, elemento){
    // Verifica se já existe aviso na tela
    let existe = document.getElementById("aviso");

    if(!existe){
        // Criando um aviso
        const aviso = document.createElement("div");
        aviso.id = "aviso";
        const textoAviso = document.createTextNode(mensagem);
        aviso.appendChild(textoAviso);

        // Colocando o aviso na página de menu
        elemento.before(aviso);
    };
};

// Função para criar aviso de vencer
function vencer(elemento){
    // Verifica se já existe aviso na tela
    let existe = document.getElementById("venceu");

    if(!existe){
        // Criando um aviso
        const aviso = document.createElement("div");
        aviso.id = "venceu";
        const textoAviso = document.createTextNode("Parabéns! Você venceu!");
        aviso.appendChild(textoAviso);

        // Colocando o aviso na página de menu
        elemento.before(aviso);
    };
};