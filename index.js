const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3000

app.use(express.json())

const orders = []

const checkOrderId = (req, res, next) =>{
    const {id} = req.params

    const index = orders.findIndex(user => user.id === id)

    if(index < 0){
        return res.status(404).send("order not found")
    }

    req.orderIndex = index
    req.orderId = id
    next()    
}

const call = (req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next();
};

app.get('/order', call,(req,res)=>{
    return res.json(orders)
})

app.post('/order', call,(req,res)=>{
    const { client, order, price } = req.body;

    
    const newOrder = { id: uuid.v4(), client, order, price };

    
    orders.push(newOrder);

    return res.status(201).json(newOrder);
})

app.put('/order/:id', checkOrderId,call, (req, res) => {
    const { client, order, price, status } = req.body;
    const id = req.orderId
    const index = req.orderIndex

    const upDateOrder = { id, client, order, price, status };

    
    orders[index] = upDateOrder;

    return res.json(upDateOrder);
});
app.patch('/order/:id', checkOrderId,call,(req,res)=>{
    const { client, order, price, status } = req.body;
    const id = req.orderId
    const index = req.orderIndex

    const upDateOrder = { id, client, order, price, status };


    orders[index] = upDateOrder;

    return res.json(upDateOrder);
})
app.delete('/order/:id', checkOrderId,call,(req,res)=>{
   const index = req.orderIndex


    orders.splice(index,1)
    return res.status(204).json()

})







app.listen(port,()=>{
    console.log(`server run on port ${port}`)
})
