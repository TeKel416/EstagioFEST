$(document).ready(()=>{
    $('#iniciar').click(()=>{
        //chamada da função para iniciar o jogo
        $('#areajogo').html(iniciarJogo());
    });

    //variável global que define o tamanho do tabuleiro
    let grid = 2
    

    //função de inicialização do jogo
    function iniciarJogo (){
        $('#iniciar').remove();

        //ids das células
        let a = 0;
        //lista com os ids das células
        let celulas = [];
        //aumenta o tamanho do tabuleiro a cada reiniciação
        grid++;

        //cria a tabela #tabuleiro
        $('#areajogo').append('<table id="tabuleiro"></table>')

        //cria as linhas
        for(let i=0; i<grid; i++){
            $('#tabuleiro').append(`<tr id="r${i}"></tr>`);

            //crias as células
            for(let j=0; j<grid; j++){
                $(`#r${i}`).append(`<td id="${a}" class="celula"></td>`);

                //adiciona o id à lista e cria o próximo id
                celulas.push(a);
                a++;
            }
        }

        //aleatoriza a ordem dos ids na lista
        celulas = celulas.sort(() => Math.random() - 0.5);


        //retira o primeiro id da lista
        let primeiro = celulas[0];

        //recupera o último id da lista
        let ultimo = celulas[celulas.length-1];

        //adiciona o estado de apertado à primeira célula escolhida
        $(`#${primeiro}`).addClass('apertado');


        //percorre a lista de ids
        for (let i=0; i<celulas.length; i++) {

            //define a função ao clicar nas células
            $('#'+celulas[i]).click(()=>{
                //verifica se a célula já foi apertada
                if($('#'+celulas[i]).hasClass('apertado')){
                    //adiciona o estado de apertado à próxima célula da lista
                    $('#'+celulas[i+1]).addClass('apertado')

                    //verifica se a célula clicada foi a última
                    if(celulas[i] == ultimo){
                        //verifica se o parabéns existe
                        let existe = $('body').has($('#parabens')).length

                        if(existe === 0){
                            //imprime a congratulação
                            $('#areajogo').append('<h2 id="parabens">PARABUÉINS!</h2>')
                        }
                    }
                }

            })
        }

        //cria o botão de reiniciar
        $('#tabuleiro').after('<br><button type="button" id="reiniciar">Reiniciar</button>');

        //reinicia o tabuleiro ao clicar no botão reiniciar
        $('#reiniciar').click(()=>{
            //limpa o tabuleiro
            $('#areajogo').html('');
            
            //readiciona o botão de iniciar
            $('#titulo').after('<button type="button" id="iniciar">Iniciar!</button>')

            //define a função ao clicar o botão iniciar
            $('#iniciar').click(()=>{
                //chamada da função para iniciar o jogo
                $('#areajogo').html(iniciarJogo());
            });
        })

        
    }
})