// socket.js
import { io } from 'socket.io-client'
import { getToken } from '@/utils/auth'

let socket = null

function initSocket() {
  const token = getToken()

  // If there is already a socket connection, close it first
  if (socket) {
    socket.disconnect()
    socket = null
  }

  // Initialize a new socket connection
  socket = io(process.env.VUE_APP_WEBSOCKET_URL, {
    auth: { token },
  })

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })

  // Process messages sent from the server
  socket.on('message', (data) => {
    console.log('Received message:', data)
  })

  socket.on('broadcastMessage', (data) => {
    console.log('Received broadcast message:', data)
  })
}

function closeSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export { socket, initSocket, closeSocket }
