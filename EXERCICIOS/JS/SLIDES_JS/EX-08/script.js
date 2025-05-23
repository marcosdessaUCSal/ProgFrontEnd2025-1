// DEFININDO CLASSES ============================================================================
class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Figura {
    constructor(img, id, w, h) {
        this.img = img; // objeto do tipo Image
        this.id = id;
        this.w = w;
        this.h = h;
    }
}

class Tela {
    constructor(canvasId) {
        // relativo ao Canvas: conectando-se aos canvas
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // valores default
        this.COR_FUNDO = 'rgb(156, 196, 229)';
        this.corDefault = 'black';
    }

    // BÁSICO: define a cor atual
    defCor(cor) {
        this.corDefault = cor;
    }
    // BÁSICO: espessura do traço
    defEspessura(esp) {
        ctx.lineWidth = esp;
    }
    // BÁSICO: limpa a tela
    cls() {
        let w = this.canvas.width;
        let h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
    }

    // desenha uma linha entre pontos
    desenhaLinha(coords1, coords2) {
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.moveTo(coords1.x, coords1.y);
        this.ctx.lineTo(coords2.x, coords2.y);
        this.ctx.stroke();
    }

    // desenha uma linha tracejada entre pontos
    desenhaLinhaPontilhada(coords1, coords2) {
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.setLineDash([4, 4]);
        this.ctx.beginPath();
        this.ctx.moveTo(coords1.x, coords1.y);
        this.ctx.lineTo(coords2.x, coords2.y);
        this.ctx.stroke();
    }

    // desenha um retângulo cheio
    pintaRetangulo(coords, w, h) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.fillRect(coords.x, coords.y, w, h);
    }

    // desenha um retângulo (apenas o contorno)
    desenhaRetangulo(coords, w, h) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.rect(coords.x, coords.y, w, h);
        this.ctx.stroke();
    }

    // desenha um círculo aberto
    desenhaCirculo(centro, raio) {
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.arc(centro.x, centro.y, raio, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    // pinta um círculo
    pintaCirculo(centro, raio) {
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.arc(centro.x, centro.y, raio, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    // escreve um texto
    escreve(coords, txt) {
        this.ctx.strokeStyle = this.corDefault;
        this.ctx.fillStyle = this.corDefault;
        this.ctx.font = "italic 30px Times New Roman";
        this.ctx.fillText(txt, coords.x, coords.y);
    }

    // exibe uma imagem na tela, dados id e coordenadas
    exibirImg(id, x, y) {
        let fig = listaFigs.find(fig => fig.id == id);
        if (fig == undefined) return;
        this.ctx.drawImage(fig.img, x, y, fig.w, fig.h);
    }

    // exibe uma imagem, mas com controle de rotação, escala e opacidade
    // as coordenadas aqui são do centro (não do vértice esquerdo superior)
    exibirImgEsp(id, x, y, escala, angulo, opacidade) {
        let fig = listaFigs.find(fig => fig.id == id);
        let s = escala / 100;
        if (fig == undefined) return;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(-angulo * Math.PI / 180);
        this.ctx.globalAlpha = opacidade / 100;
        this.ctx.drawImage(fig.img, -s * fig.w / 2, -s * fig.h / 2, s * fig.w, s * fig.h);
        this.ctx.restore();
    }

    // exibe uma imagem, mas mas com controle de escala horizontal ou vertical
    // as coordenadas aqui são do centro (não do vértice esquerdo superior)
    exibirImgProp(id, x, y, escalaX, escalaY) {
        let fig = listaFigs.find(fig => fig.id == id);
        let sX = escalaX / 100;
        let sY = escalaY / 100;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.drawImage(fig.img, -sX * fig.w / 2, -sY * fig.h / 2, sX * fig.w, sY * fig.h);
        this.ctx.restore();
    }

}

// CONSTANTES ===============================================================

// objetos de imagens (objetos Figura) - precisa ser gerado em função dos ids
var listaFigs = [];

// pasta onde se encontram as figuras
window.CAMINHO = 'img/';

// formato padrão das imagens importadas
const TIPO = '.png';

// objeto Tela:
const tela = new Tela('canvas');



// CONTROLE DO TEMPO =====================================================
function iniciaTemporizador(fps, onoff) {
    if (onoff) {
        interval = setInterval(
            () => {
                // ISSO É SÓ DEMONSTRAÇÃO: REMOVER SE NÃO FOR USAR
            }, 1000 / fps
        );
    } else {
        if (typeof interval === 'undefined') return;
        clearInterval(interval);
    }

}

// DEFINIÇÃO DE EVENTOS DO MOUSE =========================================================
function defineEventoClique() {
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // TODO: IMPLEMENTAR AQUI A AÇÃO DO CLIQUE DETECTADO
    })
}

function defineEventoPresencaDoMouse() {
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // TODO: IMPLEMENTAR AQUI O QUE FAZER
    });
}


// CARREGAMENTO DE IMAGENS DO DISCO =========================================================

async function carregarTodasAsFiguras() {
    for (let indice in listaFigs) {
        try {
            listaFigs[indice].img = await (carregarFigura(listaFigs[indice].id));
        } catch (erro) {
            console.log(erro);
        }
    }
}

function carregarFigura(id) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = CAMINHO + id + TIPO;
    });
}

// O objeto imagem é inicialmente nulo, mas deve posteriormente ser instanciado
// com base no id
function defineListaFiguras() {
    // listaFigs.push(
    //     new Figura(null, 'logo', 400, 400)
    // );
}




// ============  INSTRUÇÕES INICIAIS ======================
iniciar();


// O NÚCLEO DO SEU PROJETO ESTÁ AQUI ============================================

async function iniciar() {
    defineListaFiguras();
    await carregarTodasAsFiguras();
    meuCodigo();
}


class Emp {
    constructor(nome, salario) {
        this.nome = nome;
        this.salario = salario;
    }

    impRenda() {
        let valor = 0;
        if (this.salario >= 2000) {
            valor = this.salario * 0.15;
        }
        return valor;
    }
}

function meuCodigo() {

    let empregados = [];
    empregados.push(new Emp('João', 3500));
    empregados.push(new Emp('Márcio', 1500));
    empregados.push(new Emp('Renato', 9800));

    let altura = 1;
    for (emp of empregados) {
        tela.escreve(new Coords(50, 50 * altura++),
        `${emp.nome} recebe ${emp.salario} e paga ${emp.impRenda()}`);
    }

}