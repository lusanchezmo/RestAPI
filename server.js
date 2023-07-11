const express = require('express')
const morgar = require('morgan')

const app = express()
let products = [
    {
        id:1,
        name:"laptop",
        price:3000
    }
]

app.use(morgar('dev'))
app.use(express.json())

app.get('/products', (req,res) => {
    res.json(products)
})

app.post('/products', (req,res) => {
    const newProduct = {...req.body, id: products.length +1}
    products.push(newProduct);
    res.send(newProduct)
})

app.put('/products/:id', (req,res) => {
    const newData = req.body
    const proudctFound = products.find(function (product) {
        return product.id == req.params.id
    })

    if(!proudctFound) return res.status(404).json({
        message: "product not found"
    })
    products = products.map(p => p.id === parseInt(req.params.id) ? {...p,...newData} : p) 
    console.log(products);

    res.send('actualizando productos')
})

app.delete('/products/:id', (req,res) => {
    const proudctFound = products.find(function (product) {
        return product.id == req.params.id
    })

    if(!proudctFound) return res.status(404).json({
        message: "product not found"
    })

    products = products.filter(product => product.id !== parseInt(req.params.id))
    console.log(products);

    res.send('eliminando productos')
})


app.get('/products/:id', (req,res) => {
    console.log(req.params.id);
    const proudctFound = products.find(function (product) {
        return product.id == req.params.id
    })

    if(!proudctFound) return res.status(404).json({
        message: "product not found"
    })
    console.log(proudctFound);
    res.json(proudctFound)
})

app.listen(3000)
console.log('Server on port 3000');