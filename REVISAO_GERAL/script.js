function vermelho() {
    const o1 = document.getElementById('o1');
    o1.classList.remove('quadrado');
    o1.classList.add('quadradao');
}

function amarelo() {
    const o2 = document.getElementById('o2');
    o2.classList.remove('quadrado');
    o2.classList.add('bola');
}

function verde() {
    const o3 = document.getElementById('o3');
    o3.classList.remove('quadrado');
    o3.classList.add('quadradinho');
}

function todos() {
    const o1 = document.getElementById('o1');
    const o2 = document.getElementById('o2');
    const o3 = document.getElementById('o3');
    o1.classList.remove('quadrado');
    o2.classList.remove('quadrado');
    o3.classList.remove('quadrado');
    o1.classList.add('invisivel');
    o2.classList.add('invisivel');
    o3.classList.add('invisivel');

}