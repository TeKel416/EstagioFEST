/*VARIÁVEIS GLOBAIS*/
var altura = 0;
var largura = 0;
var vida = 1;
var tempo = 10;
var mosquito_tempo = 2000;



/* ===========
      NÍVEL
   =========== */
var nivel = window.location.search;
nivel = nivel.replace('?', '');

if(nivel === 'facil') {
    tempo = 15;
} else if (nivel === 'normal') {
    tempo = 30;
    mosquito_tempo = 1300;
} else if (nivel === 'dificil') {
    tempo = 45;
    mosquito_tempo = 1000;
} else if (nivel === 'pesadelo') {
    tempo = 60;
    mosquito_tempo = 800;
}



/* ===========
      PALCO
   =========== */
/*DEFINIÇÃO DO PALCO DO JOGO*/
/*Alteração do tamanho dependendo da janela*/
function ajeitaTamanhoTela() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura);
};

/*Chamada inicial da função*/
ajeitaTamanhoTela();



/* ==============
      MOSQUITO
   ============== */
/*POSICIONAMENTO DO MOSQUITO*/
function posicaoRandom() {
    /*Remoção de mosquito pré-existente*/
    var existe = document.getElementById('mosquito');

    if(existe) {
        document.getElementById('mosquito').remove();

        if(vida > 3){
            window.location.href = 'game_over.html';

        } else {
            console.log('Vidas perdidas:' + vida);

            /*Remoção de 1 vida ao perder um mosquito*/
            document.getElementById(('v' + vida)).src = 'img/coracao_vazio.png';
            vida++;
        };
    };
    
    /*Posicionamento aleatório do mosquito*/
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    /*Retirada de posições negativas*/
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    /*Criação do elemento html*/
    var mosquito = document.createElement('img');
    mosquito.src = 'img/mosca.png';

    /*Adição do CSS na imagem*/
    mosquito.id = 'mosquito';
    mosquito.className = tamanhoRandom();
    mosquito.style.transform = orientacaoRandom();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';

    mosquito.onclick = function() {
        this.remove();
    };

    /*Adição do mosquito no body*/
    document.body.appendChild(mosquito);
}


/*TAMANHO DO MOSQUITO*/
function tamanhoRandom() {
    var tamanho = Math.floor(Math.random() * 3);

    console.log('Tamanho:' + tamanho);

    switch(tamanho) {
        case 0:
            return 'mosquito1';

        case 1:
            return 'mosquito2';

        case 2:
            return 'mosquito3';
    };
};


/*ORIENTAÇÃO DO MOSQUITO*/
function orientacaoRandom() {
    var orientacao = Math.floor(Math.random() * 2);

    console.log('Lado:' + orientacao);

    if(orientacao == 1) {
        return 'rotateY(180deg)';
    };
};



/* ===========
      TIMER
   =========== */
var cronometro = setInterval(function(){
    tempo--;

    if(tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = 'winner.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    };
}, 1000);