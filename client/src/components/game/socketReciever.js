import { io } from "socket.io-client";
const room = socket.id;
const socket = io('http//localhost:3000')
const message = 'Room Joined!';

socket.on('connect', socket => {
    displayMessage(`connected with id: ${socket.id}`)
});

function displayMessage() {
    const divEl = document.createElement("div");
    divEl.innerHTML = message;
    document.getElementById('initialMessage').appendChild(divEl);
}

const joinRoomButton = joinRoomButton.addEventListener('click', () => {
    socket.emit('join-room', room, message => {
        displayMessage(message);
    })
});
// socket.emit('board-action', 10, "hi", room)


