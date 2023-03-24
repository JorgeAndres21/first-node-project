const { request } = require('express')
const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000
const requestId = (request , response , next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) { return response.status(404).json({ message: "User not found" }) }

    request.indexId = index

    next()
}

let users = []

app.use(express.json())

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', requestId , (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const updateUser = { id, name, age }

    const index = request.indexId
    
    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', requestId , (request, response) => {
    const index = request.indexId

    users.splice(index , 1)

    return response.status(204).json()
})

app.listen(port, console.log(`o port e ${port}`))
