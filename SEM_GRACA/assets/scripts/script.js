var arrayEmails = [];   //REMOVER
var idCount = 0;
var arraySujeitos = [];

// Classes

class Sujeito {
    constructor(id, nome, engracado) {
        this.id = id;
        this.nome = nome;
        this.engracado = engracado; // booleano: 0 = sem graça, 1 = engraçado
    }

    mensagem() {
        const classificado = this.engracado ? 'é engraçado' : 'não tem graça';
        return `${this.nome} ${classificado}!`;
    }
}



/*
    =====================================================
        INTERAÇÃO COM O USUÁRIO
    =====================================================
*/

function mudarParaDir() {
    const colEsq = document.querySelector('#col-esq');
    const colDir = document.querySelector('#col-dir');
    const areaEsq = document.querySelector('#area-esq');
    const areaDir = document.querySelector('#area-dir');
    const btnEsq = document.querySelector('#btn-esq');
    const btnDir = document.querySelector('#btn-dir');

    colEsq.classList.remove('tamanho-pequeno');
    colEsq.classList.add('tamanho-grande');
    areaEsq.classList.remove('invisivel');
    areaEsq.classList.add('visivel');
    btnEsq.classList.remove('invisivel');
    btnEsq.classList.add('visivel');

    colDir.classList.remove('tamanho-grande');
    colDir.classList.add('tamanho-pequeno');
    areaDir.classList.remove('visivel');
    areaDir.classList.add('invisivel');
    btnDir.classList.remove('visivel');
    btnDir.classList.add('invisivel');
}

function mudarParaEsq() {
    const colEsq = document.querySelector('#col-esq');
    const colDir = document.querySelector('#col-dir');
    const areaEsq = document.querySelector('#area-esq');
    const areaDir = document.querySelector('#area-dir');
    const btnEsq = document.querySelector('#btn-esq');
    const btnDir = document.querySelector('#btn-dir');

    colEsq.classList.remove('tamanho-grande');
    colEsq.classList.add('tamanho-pequeno');
    areaEsq.classList.remove('visivel');
    areaEsq.classList.add('invisivel');
    btnEsq.classList.remove('visivel');
    btnEsq.classList.add('invisivel');

    colDir.classList.remove('tamanho-pequeno');
    colDir.classList.add('tamanho-grande');
    areaDir.classList.remove('invisivel');
    areaDir.classList.add('visivel');
    btnDir.classList.remove('invisivel');
    btnDir.classList.add('visivel');
}

// ENVIAR SUJEITO PARA A ESTRUTURA DE DADOS
function enviar(engracado) {
    const id = engracado ? 'area-dir' : 'area-esq';
    const nome = document.getElementById(id).value.trim();
    if (nome.length = 0) return;
    const engracadoStr = engracado ? 'engraçado' : 'sem graça';
    arraySujeitos.push(new Sujeito(++idCount, nome, engracado));

    esconderRegistros();
    setTimeout(
        () => {
            mostrarMensagens(`O sujeito ${nome} ${engracadoStr} já foi cadastrado!`);
        }, 150);
}

// MOSTRAR REGISTROS
function verSujeitos() {
    const containerReg = document.querySelector('#cont-reg');
    let conteudo = '';
    let linha = '';
    let engracado = '';
    let engracadoClasse = '';

    conteudo += `<div class="topo-registros" id="topo-registros">`;
    conteudo += `</div>`;
    conteudo += `<div class="cabecalho-registros">`;
    conteudo += `   <div>GRAÇA</div>`;
    conteudo += `   <div>SUJEITO</div>`;
    conteudo += `</div>`;

    for (let item of arraySujeitos) {
        engracado = item.engracado ? 'ENGRAÇADO' : 'SEM GRAÇA';
        engracadoClasse = item.engracado ? '' : 'cor-sem-graca';
        linha = `<div class="linha-reg">`;
        linha += `  <div class="col-graca ${engracadoClasse}">${engracado}</div>`;
        linha += `  <div class="col-sujeito">${item.mensagem()}</div>`;
        linha += `</div>`;
        conteudo += linha;
    }

    if (arraySujeitos.length == 0) {
        conteudo += '<div class="linha-reg">';
        conteudo += '  <div>---</div>';
        conteudo += '  <div>NENHUM ITEM A SER EXIBIDO</div>';
        conteudo += '</div>';
    }

    conteudo += `<div class="base-registros"></div>`;
    containerReg.innerHTML = conteudo;
    containerReg.classList.remove('invisivel');
    containerReg.classList.add('visivel');

}

// ESCONDER REGISTROS
function esconderRegistros() {
    const containerReg = document.querySelector('#cont-reg');

    containerReg.classList.remove('visivel');
    containerReg.classList.add('invisivel');
}

function apagarSujeitos() {
    arraySujeitos.length = 0;

    // Cuidar da mensagem
    esconderRegistros();
    setTimeout(
        () => {
            mostrarMensagens("Sujeitos já foram apagados. Melhore a sua lista!");
        }, 150);
}

// Para exibir mensagens
function mostrarMensagens(msg) {
    const containerReg = document.querySelector('#cont-reg');

    let conteudo = '';
    conteudo += '<div class="topo-registros" id="topo-registros">';
    conteudo += '   <div class="msg-titulo">MENSAGEM</div>';
    conteudo += '   <div class="linha-msg">';
    conteudo += `       <div>${msg}</div>`;
    conteudo += `   </div>`;
    conteudo += '</div>';
    conteudo += '<div class="base-registros"></div>';

    containerReg.innerHTML = conteudo;

    containerReg.classList.remove('invisivel');
    containerReg.classList.add('visivel');
}

function verLista() {
    esconderRegistros();
    setTimeout(
        () => {
            verSujeitos();
        }, 150);
}

function mockarSujeitos() {
    arraySujeitos.length = 0;
    arraySujeitos.push(new Sujeito(++idCount, 'Didi Mocó', false));
    arraySujeitos.push(new Sujeito(++idCount, 'Mussum', true));
    arraySujeitos.push(new Sujeito(++idCount, 'Jerry Lewis', true));

    // Cuidar da mensagem
    esconderRegistros();
    setTimeout(
        () => {
            mostrarMensagens("Sujeitos, com ou sem graça, já foram mockados!");
        }, 150);
}

