const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';
const socket=require('socket.io');


const server=app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static('public'));

const io=socket(server);

app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html');
});


// In order to send an event to everyone, Socket.IO gives us the io.emit() method.
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

var player1_jogada = "";
var player2_jogada = "";
var resultado_final = "";

// Detecta quando um usuário conecta no servidor
io.on('connection', (socket) => {
    console.log('a user connected');

    // Detecta quando um usuário envia uma jogada
    // O evento se chama 'jogada' e é pego no socket.emit('jogada', $("#pedra").val());
    socket.on('jogada_player1', (jogada) => {
        player1_jogada = jogada;
        console.log("Player1: " + player1_jogada);
        io.emit('jogada_player1_resultado', jogada);
    });

    socket.on('jogada_player2', (jogada) => {
    player2_jogada = jogada;
    console.log("Player2: " + player2_jogada);
    // resultado_final = vencedor(player1_jogada, player2_jogada);
    // // console.log(resultado_final);
    io.emit('jogada_player2_resultado', jogada);
    result();
    });

    socket.on('jogo_finalizado', (resultado) => {
        console.log("dsdsdsds");
        console.log("dsdsdsds");
        io.emit('resultado_final', resultado_final);
    });

    
    // Função para calular quem venceu
    const vencedor=(player1, player2)=>  {
        if (player1 === player2) {
            return "empate";
        } else if (player1 === "pedra" && player2 === "papel") {
            return "player2";
        } else if (player1 === "pedra" && player2 === "tesoura") {
            return "player1";
        } else if (player1 === "papel" && player2 === "pedra") {
            return "player1";
        } else if (player1 === "papel" && player2 === "tesoura") {
            return "player2";
        } else if (player1 === "tesoura" && player2 === "pedra") {
            return "player2";
        } else if (player1 === "tesoura" && player2 === "papel") {
            return "player1";
        } else {
            return "esqueci rsrsr";
        }
    
    }

    const result=()=>  {
        resultado_final = vencedor(player1_jogada, player2_jogada);
        console.log(resultado_final);
        io.emit('resultado_final', resultado_final);
    }

    // Detecnado quando um usuário desconecta
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });