const {
    CreateOrderControl,
    CompleteOrderControl,
    GetSellerActiveOrdersControl,
    GetSellerOrderPerUserControl,
    GetLast_15UserOrdersControl,
    SetOrderDeliveryTimeControl
} = require('./orders-controller');

const router = require('express').Router();
const UserToken = require('../../auth/UsersTokenValidation');
const SellerToken = require('../../auth/SellersTokenValidation');

router.put('/complete', SellerToken.checkToken, CompleteOrderControl);
router.post('/', UserToken.checkToken, CreateOrderControl);
router.get('/:id', SellerToken.checkToken, GetSellerOrderPerUserControl);
router.get('/sellers/:id', SellerToken.checkToken, GetSellerActiveOrdersControl);
router.get('/users/:id', UserToken.checkToken, GetLast_15UserOrdersControl);
router.put('/deliveryTime', SellerToken.checkToken, SetOrderDeliveryTimeControl);

module.exports = router;