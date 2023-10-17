// const io = require("socket.io")(3000, {
//     cors: {
//         origin: ['http://localhost3000']
//     }
// }); 
// io.on("connection", socket => {
//     console.log(socket.id);
//     socket.on('send-message', (room) => {
//         socket.to(room);
//     })
//     socket.on('join-room', room => {
//         socket.join(room)
//     })
//     socket.on('join-room', (room, cb) => {
//         socket.join(room);
//         cb(`Joined ${room}`)
//     })
// });