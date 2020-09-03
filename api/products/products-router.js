const {
    AddNewProductControl,
    DeleteProductControl,
    SetProductControl,
    GetSellerProductsControl,
    GetLikedSellerProductsToUserControl,
    GetProductBasedUserLocationControl,
    GetProductByIdControl,
    GetSellerProducts2UsersControl,
    GetProductsCollectionControl,
    GetProductsByCategoryControl
} = require('./products-controller');

const router = require('express').Router();
const UserToken = require('../../auth/UsersTokenValidation');
const SellerToken = require('../../auth/SellersTokenValidation');

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, Callback) => {

        try {
            const ProductImage = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
            const ProductImageURL = process.env.DOMAIN_NAME + '/upload/images/' + ProductImage
            req.body.Images = ProductImageURL;
            return Callback(null, ProductImage);
        } catch (e) { }
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
});


router.post('/', SellerToken.checkToken, upload.single('Images'), AddNewProductControl);
router.put('/delete', SellerToken.checkToken, DeleteProductControl);
router.put('/update', SellerToken.checkToken, SetProductControl);
router.get('/id/:id', UserToken.checkToken, GetProductByIdControl);
router.get('/sellerproducts/:id', UserToken.checkToken, GetSellerProducts2UsersControl);
router.get('/sellers/:id', SellerToken.checkToken, GetSellerProductsControl);
router.get('/likedproducts/:id', UserToken.checkToken, GetLikedSellerProductsToUserControl);
router.get('/baseduserlocation/:id', UserToken.checkToken, GetProductBasedUserLocationControl);
router.get('/collection', UserToken.checkToken, GetProductsCollectionControl);
router.get('/category/:id', UserToken.checkToken, GetProductsByCategoryControl);


module.exports = router;