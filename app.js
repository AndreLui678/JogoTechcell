const tela = document.querySelector('.tela')
const terra = document.querySelector('.grass')
const bateriaPorcen = document.querySelector('.porcentagem')
const bateriaText = document.querySelector('.bateria b')
const person = document.querySelector('.personagem');
const img = document.querySelector('.personagem img')
var porcen
porcen = 70

var terraY = terra.offsetTop + terra.clientHeight

var px;
var py;
var dx;
var vel;

var personW = person.clientWidth
var personH = person.clientHeight

let ePy
let ePx

var energias = [];
var numElementos = 5;

var energiaSize = 80;
var objSize = 87;

var alturaTela = tela.clientHeight;
var larguraTela = tela.clientWidth;

var bateria = porcen;
bateriaText.innerHTML = `${bateria}%`;

var abrido = false

// aqui se inicia tudo

function iniciar() {
 dx = 0;
 px = 40;
 py = alturaTela - personH - 30;
 vel = 20;

 document.addEventListener('keydown', teclaDw)
 document.addEventListener('keyup', teclaUp)

 document.addEventListener('touchstart', teclaDw)
 document.addEventListener('touchend', teclaUp)

 for (let i = 0; i < numElementos; i++) {
  let delay = 1000 + Math.random() * 2000

  setTimeout(() => {
   const energia = document.createElement('img');
   energia.src = 'bateria.png';
   energia.id = 'energia';
   tela.appendChild(energia);

   let vel = 2 + Math.random() * 4
   ePy = -Math.random() * 100;
   ePx = Math.random() * (larguraTela - objSize);

   energias.push({ elemento: energia, ePx: ePx, ePy: ePy, vel: vel });
  }, delay)
 }

 setInterval(enterFrame, 20);
}

// aqui configura as funçoes nas teclas para andar

function teclaDw() {
 var tecla = event.key
 if (tecla == 'a' || tecla == 'A') {
  dx = -1

 } else if (tecla == 'd' || tecla == 'D') {
  dx = 1
 }
}

function teclaUp() {
 var tecla = event.key
 if (tecla == 'a' || tecla == 'A') {
  dx = 0

 } else if (tecla == 'd' || tecla == 'D') {
  dx = 0
 }
}

// aqui é o funionamento do jogo

function enterFrame() {
 px += dx * vel;

 if (px < 0) {
  px = 0;
 } else if (px + energiaSize > larguraTela) {
  px = larguraTela - energiaSize;
 }

 for (let i = 0; i < energias.length; i++) {
  let energiaData = energias[i];

  energiaData.ePy += energiaData.vel;

  if (energiaData.ePy > alturaTela) {
   energiaData.ePy = -100;
   energiaData.ePx = Math.random() * (larguraTela - energiaSize);
  }

  if (
   px < energiaData.ePx + energiaSize &&
   px + personW > energiaData.ePx &&
   py < energiaData.ePy + energiaSize &&
   py + personH > energiaData.ePy
  ) {
   energiaData.ePy = -100;
   energiaData.ePx = Math.random() * (larguraTela - energiaSize);

   bateria = Math.min(bateria + 2, 100);
   porcen = Math.min(porcen + 2, 100);
  }

  if (energiaData.ePy + energiaSize >= terraY) {
   energiaData.ePy = -100;
   energiaData.ePx = Math.random() * (larguraTela - energiaSize);

   bateria = Math.max(bateria - 4, 0);
   porcen = Math.max(porcen - 4, 0);

   img.src = 'XoX.png'
   person.classList.add('vibration')

   setTimeout(() => {
    img.src = 'celular.png'
    person.classList.remove('vibration')
   }, 300);
  }

  person.style.left = px + 'px';
  energiaData.elemento.style.left = energiaData.ePx + 'px';
  energiaData.elemento.style.top = energiaData.ePy + 'px';
 }

 bateriaText.innerHTML = `${bateria}%`;
 bateriaPorcen.style.width = `${porcen}%`;

 if (bateria === 100 && !abrido) {
  window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran')
  abrido = true
 }

 if (bateria <= 25) {
  bateriaPorcen.style.backgroundColor = 'red'
 } else if (bateria <= 75) {
  bateriaPorcen.style.backgroundColor = 'yellow'
 } else if (bateria <= 100) {
  bateriaPorcen.style.backgroundColor = 'green'
 }
}

window.addEventListener('load', iniciar)