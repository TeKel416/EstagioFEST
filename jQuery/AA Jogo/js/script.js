// Função para iniciar o jogo
 function iniciar(){
    let dificuldade = getDifficulty();

    // Verifica se e qual dificuldade foi selecionada
    if(dificuldade){
        if(dificuldade == "facil"){
            console.log('facil')
        }
        else if(dificuldade == "medio"){
            console.log('medio')
        }
        else{
            console.log('dificil')
        };
        buildTable(1)
    };

 }

// Função para montar o tabuleiro
function buildTable(tamanho){
    // Criando a tabela
    let tabela = document.createElement("table");
    tabela.id = "tabuleiro";

    // Criando as fileiras
    for (i=0; i<=tamanho; i++){
        let row = document.createElement("tr");
        row.id = `row${i}`;
    }
};

// Função para voltar ao menu


// Função para pegar o tamanho do tabuleiro
function getDifficulty(){
    let dificulty = document.getElementById("dificuldade").value;

    if(dificulty != ""){
        return dificulty;

    }else{
        let botao = document.getElementById("jogar");
        aviso(botao);
    };
};

// Função para criar aviso (div) após um elemento
function aviso(elemento){
    // Verifica se já existe aviso na tela
    let existe = document.getElementById("aviso");

    if(!existe){
        // Criando um aviso
        const aviso = document.createElement("div");
        aviso.id = "aviso";
        const textoAviso = document.createTextNode("Você não selecionou uma dificuldade!");
        aviso.appendChild(textoAviso);

        // Colocando o aviso na página de menu
        elemento.after(aviso);
    };
};