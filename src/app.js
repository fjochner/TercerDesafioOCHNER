const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');


const productManagerInstance = new ProductManager('./products.json');


app.use(express.json());


app.get('/products', (req, res) => {
    const products = productManagerInstance.getProducts();
    res.json(products);
});


app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    try {
        const product = productManagerInstance.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});