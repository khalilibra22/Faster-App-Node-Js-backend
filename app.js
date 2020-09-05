require('dotenv').config();
const express = require('express');
const app = express();
const SellerRouter = require('./api/sellers/sellers-router');
const UserRouter = require('./api/users/users-router');
const LikedStoresRouter = require('./api/liked-stores/liked-stores-router');
const ProductRouter = require('./api/products/products-router');
const OrdersRouter = require('./api/orders/orders-router');

app.use(express.json());

app.use('/upload/images', express.static('upload/images'));
app.use('/api/sellers', SellerRouter);
app.use('/api/users', UserRouter);
app.use('/api/likedstores', LikedStoresRouter);
app.use('/api/products', ProductRouter);
app.use('/api/orders', OrdersRouter);
app.use('/api', (req, res) => {
    res.status(200).send({ 'code': 1, 'message': 'WhatsssUUp' });
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('SERVER UP & Running .... ' + port));