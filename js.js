var posicaox = 0;
var posicaoy = 0;
var posicaoMx = 300;
var posicaoMy = 300;
var identificador = 0;
var pontuacao = 0;
var tecla = 40;
var inicio = false;
var tamanhot = 0;
var teclaanterior = 40;
var entrou = false;
var entrou2 = false;
var imgt = document.createElement("IMG");  

function NovoJogo() {
    location.reload(); 
}

function TeclaPressionada() {
    tecla = event.keyCode;
    if (!inicio) {
        inicio = true;
        var intervalo = setInterval(Movimento, 300);
    }
    Movimento();
}

function Movimento() {
    var i;
    TrocaImg(2);
    Ultrapassou(posicaoy, posicaox);

    for (i = identificador; i > 0; i--) {
        $("#cod" + i).css({
            left: document.getElementById('cod' + (i - 1)).style.left,
            top: document.getElementById('cod' + (i - 1)).style.top
        });
    }
    $('#cod0').css({
        left: document.getElementById('cabeca').style.left,
        top: document.getElementById('cabeca').style.top
    });

    Direcao();
    comerMaca();
}

function Direcao() {
    switch (tecla) {
        case 37: //esquerda     
            $('#cabeca').css({
                left: '-=10px',
            });
            posicaox -= 10;
            teclaanterior = 37;
        break;

        case 38: //cima
            $('#cabeca').css({
                top: '-=10px',
            });
            posicaoy -= 10;
            teclaanterior = 38;
        break;

        case 39: //direita  
            $('#cabeca').css({
                left: '+=10px',
            });
            posicaox += 10;
            teclaanterior = 39;
        break;

        case 40: //baixo 
            $('#cabeca').css({
                top: '+=10px',
            });
            posicaoy += 10;
            teclaanterior = 40;
        break;

        default:
            tecla = teclaanterior;
            Direcao();
        break;
    }
}

function comerMaca() {
    if (posicaox === posicaoMx && posicaoy === posicaoMy) {
        maca();
        pontuacao++;
        document.getElementById("pnt").innerHTML = pontuacao;
        tamanho();
    }
}

function maca() {
    posicaoMx = (Math.round(Math.random() * $(".jogo").height() / 10) * 10);
    posicaoMy = (Math.round(Math.random() * $(".jogo").height() / 10) * 10);
    if((posicaoMx > 490 || posicaoMy > 490)) maca();
    $("#maca").css({
        left: posicaoMx,
        top: posicaoMy
    })
}

function tamanho() {
    var novadiv = document.createElement("div");
    var divnormal = document.getElementById("#jogo");

    novadiv.setAttribute('class', "corpo");
    novadiv.setAttribute('id', "cod" + (++identificador));

    document.body.insertBefore(novadiv, divnormal);
    tamanhot++;
}

function TrocaImg(opc){  
    if(opc==1){
        if (!entrou) {
            entrou = true;
            imgt.src = "imagens/triste.png"; 
        }
    } 
    if(opc==2){
        if (!entrou2) {
            entrou2 = true;
            imgt.src = "imagens/feliz.png";
        }
    }
    imgt.style.height = "80px";
    document.getElementById("cobra").appendChild(imgt);
}

function Ultrapassou(y, x) {
    if (tamanhot > 0) {
        for (i = identificador; i >= 0; i--) {
            if ((document.getElementById('cabeca').style.left == document.getElementById('cod' + (i)).style.left) &&
                (document.getElementById('cabeca').style.top == document.getElementById('cod' + (i)).style.top)) {
                TrocaImg(1);
                document.getElementById("sit").innerHTML = "Você não pode atravessar si mesmo!";  
                clearInterval(intervalo);          
            }
        }
    }
    if (y < 0 || y > 490 || x < 0 || x > 490) {
        TrocaImg(1);
        document.getElementById("sit").innerHTML = "Você invadiu a parede!";
        clearInterval(intervalo);
    }
}

document.addEventListener('keydown', TeclaPressionada);