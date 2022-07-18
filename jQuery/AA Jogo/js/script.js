// Função para validar a seleção de dificuldade
function validateForm(){
    let dificuldade = document.forms["form"]["dificuldade"].value;

    if(dificuldade == ""){
        aviso();
        return false;
    }
}


function iniciar(){
    let dificuldade = (window.location.search).substring(13);

    let tamanho = getDifficultySize(dificuldade);
    buildTable(tamanho);

    let base = document.querySelector(".base");
    base.innerHTML = buildTable(tamanho);
}


// Função que determina o tamanho do tabuleiro baseado na dificuldade
function getDifficultySize(dificuldade){
    if(dificuldade == 'facil'){
        return 3;

    }else if(dificuldade == 'medio'){
        return 6;

    }else if(dificuldade == 'dificil'){
        return 9;
    }
}



// Função para montar o tabuleiro
function buildTable(tamanho){
    // Criando a tabela
    let tabela = document.createElement("table");
    tabela.id = "tabuleiro";

    // Criando as fileiras
    for (i=0; i<=tamanho; i++){
        let row = document.createElement("tr");
        row.id = String(`row${i}`);
        tabela.appendChild(row);
    }
    console.log(`Tamanho: ${tamanho}`)
    return tabela;
};

// Função para voltar ao menu


// Função para pegar o tamanho do tabuleiro


// Função para criar aviso (div) após um elemento
function aviso(){
    // Verifica se já existe aviso na tela
    let existe = document.getElementById("aviso");

    if(!existe){
        let elemento = document.getElementById("jogar");

        // Criando um aviso
        const aviso = document.createElement("div");
        aviso.id = "aviso";
        const textoAviso = document.createTextNode("Você não selecionou uma dificuldade!");
        aviso.appendChild(textoAviso);

        // Colocando o aviso na página de menu
        elemento.before(aviso);
    };
};