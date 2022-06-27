class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.desc = descricao;
        this.valor = valor;
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}


//Classe Banco de Dados
class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros() {
        let listaDespesas = [];

        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));

            //Se alguma despesa for deletada, ela não é adicionada ao array
            if (despesa === null) {
                continue;
            }
            despesa.id = i;
            listaDespesas.push(despesa);
        }

        return listaDespesas;
    }

    pesquisar(despesa) {
        let despesasFiltradas = [];

        despesasFiltradas = this.recuperarTodosRegistros();

        console.log(despesasFiltradas);

        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(i => i.ano == despesa.ano);
        }

        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(i => i.mes == despesa.mes);
        }

        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(i => i.dia == despesa.dia);
        }

        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(i => i.tipo == despesa.tipo);
        }

        //descrição
        if(despesa.desc != ''){
            despesasFiltradas = despesasFiltradas.filter(i => i.desc == despesa.desc);
        }

        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(i => i.valor == despesa.valor);
        }

        return despesasFiltradas;
    }

    remover(id) {
        localStorage.removeItem(id);
    }
}


//Criação do ID inicial para as despesas
let bd = new Bd ();


//Cria uma nova despesa e a grava no Local Storage após validação dos dados
function cadastrarDespesa() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let desc = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        desc.value, 
        valor.value
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa);
        modalDespesa('sucesso');
        
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        desc.value = '';
        valor.value = '';

    } else {
        modalDespesa('erro');
    }
}


//Modifica o modal para situações de erro e sucesso da validação de dados
function modalDespesa(x) {
    if(x === 'sucesso'){
        //Adiciona classes e conteúdo para modal sucesso
        document.getElementById('modalTitulo').className = 'modal-header text-success';

        document.getElementById('modalTituloTexto').innerHTML = 'Sucesso na gravação dos dados';

        document.getElementById('modalCorpo').innerHTML = 'Dados da despesa gravados com sucesso!';

        document.getElementById('modalBotao').className = 'btn btn-success';

        document.getElementById('modalBotao').innerHTML = 'Fechar';

        $('#modalRegistraDespesa').modal('show');

    } else if (x === 'erro') {
        //Adiciona classes e conteúdo para modal erro
        document.getElementById('modalTitulo').className = 'modal-header text-danger';

        document.getElementById('modalTituloTexto').innerHTML = 'Erro na gravação dos dados';

        document.getElementById('modalCorpo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos!';

        document.getElementById('modalBotao').className = 'btn btn-danger';

        document.getElementById('modalBotao').innerHTML = 'Voltar e corrigir';

        $('#modalRegistraDespesa').modal('show');

    }
}


function carregaListaDespesas(listaDespesas = [], filtro = false) {

    if(listaDespesas.length == 0 && filtro == false) {
        listaDespesas = bd.recuperarTodosRegistros();
    }

    let tabelaDespesas = document.getElementById('tabelaDespesas');

    tabelaDespesas.innerHTML = '';

    listaDespesas.forEach(function(d){
        //Criação de linhas para cada objeto Despesa
        let linha = tabelaDespesas.insertRow();
        
        //Criação das colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        linha.insertCell(1).innerHTML = d.tipo;

        linha.insertCell(2).innerHTML = d.desc;

        linha.insertCell(3).innerHTML = d.valor;

        //botão de exclusão
        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${d.id}`;
        btn.onclick = function() {
            let id = this.id.replace('id_despesa_', '');

            bd.remover(id);

            window.location.reload();
        };

        linha.insertCell(4).append(btn);

        console.log(d)
    })
}


function pesquisarDespesa(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let desc = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, desc, valor);

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true);
}