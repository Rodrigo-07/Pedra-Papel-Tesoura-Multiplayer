var socket = io();

console.log($("#pedra").val())

$("#pedra_p1").click(function(e){
    e.preventDefault();
    socket.emit('jogada_player1', $("#pedra_p1").val());
});

$("#papel_p1").click(function(e){
    e.preventDefault();
    socket.emit('jogada_player1', $("#papel_p1").val());
});

$("#tesoura_p1").click(function(e){
    e.preventDefault();
    socket.emit('jogada_player1', $("#tesoura_p1").val());
});


$("#pedra_p2").click(function(e){
    e.preventDefault();
    socket.emit('jogada_player2', $("#pedra_p2").val());
});

$("#papel_p2").click(function(e){
    e.preventDefault();
    socket.emit('jogada_player2', $("#papel_p2").val());
});

$("#tesoura_p2").click(function(e){
    e.preventDefault();
    socket.emit('jogada_player2', $("#tesoura_p2").val());
});


// Detecta quando um usuário envia uma jogada e printa esssa jogada na tela
socket.on('jogada_player1_resultado', function(jogada) {
    $("#player1_escolha").html("Player 1 :" + jogada);
    $("#aguarde").html("Aguardando jogada do player 2");
  });

socket.on('jogada_player2_resultado', function(jogada) {
    $("#player2_escolha").html("Player 2 :" + jogada);
  });

socket.on('resultado_final', function(resultado) {
    console.log(resultado)
    $("#aguarde").html("");
    $("#resultado").html("Vencedor " + resultado)
  });