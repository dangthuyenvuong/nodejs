import { Server } from 'socket.io'


let users = []

let messages = [
    // {
    //     users: ['...', '....'],
    //     messages: [
    //         {
    //             content: '.....',
    //             time: 45646546543215,
    //             sender: '.......'
    //         }
    //     ]
    // }
]

export default (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })


    io.on('connection', (socket) => {


        // Message

        socket.on('send-message', (data) => {

            // {
            //     receiverId: '',
            //     content: '',
            //     time: Date.now()
            // }


            const { receiverId, content } = data
            const time = Date.now()
            let f = messages.find(e => {
                let check = e.users.find(e => e === receiverId.socketId)
                if (check) {
                    return !!e.users.find(e => e === socket.id)
                }
                return false
            })
            if (!f) {
                f = {
                    users: [socket.id, receiverId.socketId],
                    messages: []
                }

                messages.push(f)
            }
            
            f.messages.push({
                time, content, senderId: socket.id
            })
            socket.emit('update-message', f, socket.id)
            io.to(receiverId.socketId).emit('update-message', f, socket.id)
        })






        // Setup

        socket.emit('listuser', users)
        socket.emit('socketId', socket.id)

        socket.on('userlogin', (user) => {
            const u = {
                ...user,
                socketId: socket.id
            }
            users.push(u)
            socket.broadcast.emit('newuser', u)
        })

        socket.on('disconnect', () => {
            users = users.filter(e => e.socketId !== socket.id)
            socket.broadcast.emit('removeuser', socket.id)
        })
    })
}

