$(document).ready(() => {
    iniciarJogo()
    function iniciarJogo(){
        let a = 0;
        let ids = [];
        
        //Cria 3 fileiras com id=i
        for(let i = 0; i<3; i++){
            $('table').append(`<tr id="tr${i}"></tr>`);

            //Cria 3 células dentro de cada coluna de id=i
            for(let j = 0; j<3; j++){
                $('#tr' + i).append(`<td id="td${a}">${a}</td>`)
                ids.push(a);
                a++;
            }
        }

        ids = ids.sort(() => Math.random() - 0.5);

        let primeiro = ids.shift();
        $('#td'+primeiro).addClass('apertado');

        let ultimo = ids[ids.length-1];
        console.log(ultimo)

        $('#td'+primeiro).click(()=>{
            $('#td'+ids[0]).addClass('apertado');
        });

        console.log(ids)

        for (let i=0; i<ids.length; i++) {
            $('#td'+ids[i]).click(()=>{
                if($('#td'+ids[i]).hasClass('apertado')){
                    $('#td'+ids[i+1]).addClass('apertado')
                }
            })
        }


        $('#td'+ultimo).click(()=>{
            let existe = $('body').has($('#parabens')).length

            if(existe === 0){
                if($('#td'+ultimo).hasClass('apertado')){
                    $('div').append('<h1 id="parabens">PARABUÉINS!</h1>')
                }
            }
        })
    }

    $('#btn').click(()=>{
        $('#parabens').remove()
        iniciarJogo();
    })
})