import { Server } from 'socket.io'
import { decodeRefreshToken } from './src/middlware/authen_jwt.js'
import { ChatGroup } from './src/models/ChatGroup.model.js'
import { User } from './src/models/User.model.js'
import { Message } from './src/models/Message.model.js'

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

        socket.on('login', async (refreshToken) => {
            const user = decodeRefreshToken(refreshToken)
            socket.userId = user.id
            const group = await User.findOne({
                where: { id: user.id },
                include: {
                    as: 'chatgroup',
                    model: ChatGroup,
                    include: {
                        as: 'users',
                        model: User,
                        attributes: ['id', 'username', 'fullName', 'avatar']
                    },
                }
            })
            socket.emit('init', { group })
            for (let i in group.chatgroup) {
                socket.join(group.chatgroup[i].id)
            }

        })

        socket.on('load-message', async (id) => {
            const message = await Message.findAll({
                where: {
                    chatGroupId: id
                },
                include: {
                    as: 'sender',
                    model: User,
                    attributes: ['id', 'username', 'fullName', 'avatar']
                }
            })
            socket.emit('load-message', message)
        })


        socket.on('send-message', async (id, content) => {
            const res = await Message.create({
                content,
                senderId: socket.userId,
                chatGroupId: id
            })

            const message = await Message.findOne({
                where: {
                    id: res.id
                },
                include: {
                    as: 'sender',
                    model: User,
                    attributes: ['id', 'username', 'fullName', 'avatar']
                }
            })
            
            io.to(id).emit('send-message', message)
        })

        // Message

        // socket.on('send-message', (data) => {

        //     // {
        //     //     receiverId: '',
        //     //     content: '',
        //     //     time: Date.now()
        //     // }


        //     const { receiverId, content } = data
        //     const time = Date.now()
        //     let f = messages.find(e => {
        //         let check = e.users.find(e => e === receiverId.socketId)
        //         if (check) {
        //             return !!e.users.find(e => e === socket.id)
        //         }
        //         return false
        //     })
        //     if (!f) {
        //         f = {
        //             users: [socket.id, receiverId.socketId],
        //             messages: []
        //         }

        //         messages.push(f)
        //     }

        //     f.messages.push({
        //         time, content, senderId: socket.id
        //     })
        //     socket.emit('update-message', f, socket.id)
        //     io.to(receiverId.socketId).emit('update-message', f, socket.id)
        // })






        // // Setup

        // socket.emit('listuser', users)
        // socket.emit('socketId', socket.id)

        // socket.on('userlogin', (user) => {
        //     const u = {
        //         ...user,
        //         socketId: socket.id
        //     }
        //     users.push(u)
        //     socket.broadcast.emit('newuser', u)
        // })

        // socket.on('disconnect', () => {
        //     users = users.filter(e => e.socketId !== socket.id)
        //     socket.broadcast.emit('removeuser', socket.id)
        // })
    })
}

