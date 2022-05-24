/**
 versão: 0.0.2
 ações:
 - iniciando a configuração do websocket
 - criação dos componentes Join e ChatComponent
 - paramos em 38:21

 --------------------------------------------
 versão: 0.0.1
 ação: iniciando app
 TODO's: mudar futuramente o cors origin
 pois vamos fazer deste pc um SERVIDOR

 **/

const fs = require("fs");
var options = {
    key: fs.readFileSync(
        "./key.pem"
        // "/usr/local/psa/var/modules/letsencrypt/etc/live/YOURSITE/privkey.pem"
    ),
    cert: fs.readFileSync(
        "./cert.pem"
        // "/usr/local/psa/var/modules/letsencrypt/etc/live/YOURSITE/fullchain.pem"
    )
};
const app = require('https').createServer(options);
const PORT = 3001;
const cors = require('cors');
const io = require('socket.io')(app, {
        cors: {
            origin: '*'
        },
        secure: true
    }
)

// app.use(cors());
io.on('closed', data => {
    console.log('alguem saiu');
})
io.on('connect', (socket) =>{

    socket.on('userConnected', name => {
        io.emit("receiveMessage", { bot: true, message: `${name} connected!` });
    })
    socket.on('message', data => {
        console.log(data)
        io.emit('receiveMessage', data);
    })

    //--> tests
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
    //--> tests
} )

app.listen(PORT,'192.168.0.14' , () =>{
    console.log('ENV_IP')
    console.log(`rodando na porta ${PORT}`)
})

