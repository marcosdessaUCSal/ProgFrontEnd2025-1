class Registro {
    constructor(data, cidade, descr) {
        this.data = data;
        this.cidade = cidade;
        this.descr = descr;
    }
}

// escreve os registros no container
function escreveRegistros(listaReg) {
    let classeLinha = '';
    let codHtml = '';
    let str = '';
    for (let i = listaReg.length - 1; i >= 0; i--) {
        classeLinha = (listaReg.length - i) % 2 == 0 ? 'linha-escura' : 'linha-clara';
        str = `<div class="${classeLinha}">`;
        str += `<div>${listaReg[i].data}</div>`;
        str += `<div>${listaReg[i].cidade}</div>`;
        str += `<div>${listaReg[i].descr}</div>`;
        str += `</div>`;
        codHtml += str;
    }
    document.getElementById('registros').innerHTML = codHtml;
}

// gera dados mockados
function geraDados() {
    let lista = [];
    lista.push(new Registro('20/02/2024', 'CAMPINAS', 'DOCUMENTAÇÃO PRONTA'));
    lista.push(new Registro('21/02/2024', 'CAMPINAS', 'PACOTE ENVIADO'));
    lista.push(new Registro('21/02/2024', 'CAMPINAS', 'CHEGOU À UNIDADE'));
    lista.push(new Registro('21/02/2024', 'CAMPINAS', 'SAIU DA UNIDADE'));
    lista.push(new Registro('23/02/2024', 'FEIRA DE SANTANA', 'CHEGOU À UNIDADE'));
    lista.push(new Registro('24/02/2024', 'FEIRA DE SANTANA', 'SAIU DA UNIDADE'));
    lista.push(new Registro('25/02/2024', 'SALVADOR', 'CHEGOU AO DESTINO FINAL'));
    return lista;
}


// INICIALIZANDO ====================

var registros = geraDados();
escreveRegistros(registros);

