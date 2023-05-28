const express = require('express')
const port = 3001
const app = express()
let cors = require ('cors')
const uuid = require('uuid')
app.use(express.json())
app.use(cors())
const orders = []

const checkOrdersId = ( request, response, next) => {
    const { id }=request.params

    const index = orders.findIndex( user => user.id === id)
    if(index < 0){
        return response.status(404).json({ message: "Não encontrado."})
    }

    request.orderIndex = index
    request.orderId = id

    next()

}

app.get('/order', (request, response) => {
    return response.json(orders)
})


app.post('/order', (request, response) => {
    const{ Pedido, Cliente } = request.body

    const order = { id:uuid.v4(), Pedido, Cliente }

    orders.push(order)
    return response.status(201).json(order)
})

app.put('/order/:id', checkOrdersId, (request, response) => {
    
    const { Pedido, Cliente} = request.body
    const index = request.orderIndex
    const id = request.orderId

    const updateOrder = { id, Pedido, Cliente }
    
    orders[index] = updateOrder
    
    return response.json(orders)


})

app.delete('/order/:id', checkOrdersId, (request, response) => { 
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})






















app.listen(port, () =>{
    console.log(`Servidor iniciado porta ${port}`)
})